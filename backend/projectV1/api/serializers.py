from django.contrib.auth.models import User
from rest_framework import serializers, validators
from registration.models import Profile


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ("phone", "sub", "verified_at", "dob", "name")

    # Set 'phone' field as required
    phone = serializers.CharField(max_length=20, required=True)


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
