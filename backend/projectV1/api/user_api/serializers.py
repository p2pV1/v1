from django.contrib.auth.models import User
from rest_framework import serializers, validators
from registration.models import Profile
from django.contrib.auth.hashers import check_password
import re

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ("phone", "sub", "verified_at", "dob", "name")

    phone = serializers.CharField(max_length=20, required=True)

    def validate_phone(self, value):
        pattern = re.compile(r"\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}")
        if not pattern.fullmatch(value):
            raise serializers.ValidationError("Invalid Canadian phone number format")
        return value

class UserRegistrationSerializer(serializers.ModelSerializer):
    profile = ProfileSerializer()

    class Meta:
        model = User
        fields = ("username", "password", "email", "profile")

        extra_kwargs = {
            "password": {"write_only": True},
            "email": {
                "required": True,
                "allow_blank": False,
                "validators": [
                    validators.UniqueValidator(
                        User.objects.all(), "Email Already Exists"
                    )
                ],
            },
        }

    def validate_password(self, value):
        pattern = re.compile(r'^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$')
        if not pattern.fullmatch(value):
            raise serializers.ValidationError("Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, a number, and a symbol.")
        return value

    def create(self, validated_data):
        profile_data = validated_data.pop("profile")
        username = validated_data["username"]
        email = validated_data["email"]
        password = validated_data["password"]

        existing_user = User.objects.filter(email=email).first()

        if existing_user:
            existing_user.username = username
            existing_user.set_password(password)
            existing_user.save()
            profile = Profile.objects.get(user=existing_user)

            for attr, value in profile_data.items():
                setattr(profile, attr, value)
            profile.save()
            user = existing_user
        else:
            user = User.objects.create_user(
                username=username,
                email=email,
                password=password,
            )
            profile, created = Profile.objects.get_or_create(
                user=user, defaults=profile_data
            )

        return user

class UserProfileUpdateSerializer(UserRegistrationSerializer):
    class Meta(UserRegistrationSerializer.Meta):
        fields = ("username", "email", "profile")
        read_only_fields = ("username", "password")

    def update(self, instance, validated_data):
        profile_data = validated_data.pop("profile", {})
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()

        profile = instance.profile
        for attr, value in profile_data.items():
            setattr(profile, attr, value)
        profile.save()

        return instance
    
class PasswordChangeSerializer(serializers.Serializer):
    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True)

    def validate_old_password(self, value):
        user = self.context['request'].user
        if not check_password(value, user.password):
            raise serializers.ValidationError("Old password is incorrect")
        return value
