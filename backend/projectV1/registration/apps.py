from django.apps import AppConfig
import graphene


class RegistrationConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'registration'

    def ready(self):
        import registration.schema 
        graphene.Schema(query=registration.schema.Query, mutation=registration.schema.Mutation)