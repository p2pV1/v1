import graphene
from graphene_django.types import DjangoObjectType
from django.contrib.auth.models import User as UserModel

class UserType(DjangoObjectType):
    class Meta:
        model = UserModel

class CreateUser(graphene.Mutation):
    class Arguments:
        email = graphene.String(required=True)
        password = graphene.String(required=True)
        # sub = graphene.String(required=False)
    
    user = graphene.Field(UserType)
    
    def mutate(self, info, email, password):
        user = UserModel(email=email, password=password, username=email)
        user.save()
        return CreateUser(user=user)

class UserLogin(graphene.Mutation):
    class Arguments:
        email = graphene.String(required=True)
        password = graphene.String(required=True)

    success = graphene.Boolean()
    user = graphene.Field(UserType)
    message = graphene.String()

    def mutate(self, info, email, password):
        user = UserModel.objects.filter(email=email, password=password).first()
        if user is None:
            return UserLogin(success=False, message="No user found with the provided credentials")
        
        return UserLogin(success=True, user=user, message="Login successful")

class Query(graphene.ObjectType):
    all_users = graphene.List(UserType)
    
    def resolve_all_users(self, info):
        return UserModel.objects.all()

class Mutation(graphene.ObjectType):
    create_user = CreateUser.Field()
    user_login = UserLogin.Field()

schema = graphene.Schema(query=Query, mutation=Mutation)
