from django.contrib.gis.db import models
from django.utils.translation import gettext as _
import owner
from farm_base.api.v1.validators import cpf_validator, cnpj_validator


class Farm(models.Model):
    name = models.CharField(verbose_name=_("Name"), max_length=255,
                            null=False, blank=False)

    prop = models.ForeignKey(owner, on_delete=models.CASCADE, related_name='fazendas')

    state = models.CharField(verbose_name=_("State"), max_length=255, null=False, blank=False)

    city = models.CharField(verbose_name=_("City"), max_Lenght=255, null=False, blank=False)

    geometry = models.GeometryField(verbose_name=_("Geometry"),
                                    null=True, blank=True)

    area = models.FloatField(verbose_name=_("Area"),
                             blank=True, null=True)

    centroid = models.PointField(verbose_name=_("Centroid"),
                                 blank=True, null=True)

    creation_date = models.DateTimeField(verbose_name=_("Creation date"),
                                         auto_now_add=True, editable=False)

    last_modification_date = models.DateTimeField(
        verbose_name=_("Last modification date"), auto_now=True)

    is_active = models.BooleanField(verbose_name=_("Is Active"), default=True)

    def __str__(self):
        return str(self.name)

    @classmethod
    def get_by_id(cls, id):
        try:
            return cls.objects.get(id=id)
        except cls.DoesNotExist:
            return None

    @classmethod
    def get_by_owner_document(cls, document):
        if cnpj_validator(document) or cpf_validator(document):
            try:
                owner = owner.objects.get(cpf=document)
            except owner.DoesNotExist:
                try:
                    owner = owner.objects.get(cnpj=document)
                except owner.DoesNotExist:
                    return None
            return cls.objects.filter(owner=owner)

    @classmethod
    def get_by_owner_name(cls, name):
            try:
                owner = owner.objects.get(name=name)
            except owner.DoesNotExist:
                try:
                    owner = owner.objects.get(name=name)
                except owner.DoesNotExist:
                    return None
            return cls.objects.filter(owner=owner)

    @classmethod
    def get_by_farm_name(cls, name):
        try:
            return cls.objects.get(name=name)
        except cls.DoesNotExist:
            return None

    @classmethod
    def get_by_city(cls, city):
        try:
            return cls.objects.get(city=city)
        except cls.DoesNotExist:
            return None
    @classmethod
    def get_by_state(cls, state):
        try:
            return cls.objects.get(state=state)
        except cls.DoesNotExist:
            return None


    class Meta:
        ordering = ['id']
        verbose_name = _('Farm')
        verbose_name_plural = _('Farms')
