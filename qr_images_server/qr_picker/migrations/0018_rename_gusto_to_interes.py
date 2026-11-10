from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('qr_picker', '0017_remove_model_persona_descripcion_difuncion_and_more'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='Model_Gusto',
            new_name='Model_Interes',
        ),
        migrations.RenameField(
            model_name='model_interes',
            old_name='id_gusto',
            new_name='id_interes',
        ),
        migrations.RenameField(
            model_name='model_interes',
            old_name='gusto',
            new_name='interes',
        ),
        migrations.RenameField(
            model_name='model_interes',
            old_name='descripcion_gusto',
            new_name='descripcion_interes',
        ),
        migrations.RenameField(
            model_name='model_interes',
            old_name='estado_gusto',
            new_name='estado_interes',
        ),
        migrations.AlterModelTable(
            name='model_interes',
            table='tbl_interes',
        ),
        migrations.AlterModelOptions(
            name='model_interes',
            options={
                'managed': True,
                'ordering': ['interes'],
                'verbose_name': 'un interes',
                'verbose_name_plural': 'intereses',
            },
        ),
        migrations.AlterField(
            model_name='model_interes',
            name='id_interes',
            field=models.BigAutoField(
                db_column='id_interes',
                primary_key=True,
                serialize=False,
                verbose_name='Id interes',
            ),
        ),
        migrations.AlterField(
            model_name='model_interes',
            name='interes',
            field=models.TextField(
                db_column='interes',
                max_length=100,
                verbose_name='Interes',
            ),
        ),
        migrations.AlterField(
            model_name='model_interes',
            name='descripcion_interes',
            field=models.TextField(
                db_column='descripcion_interes',
                max_length=500,
                verbose_name='Descripcion interes',
            ),
        ),
        migrations.AlterField(
            model_name='model_interes',
            name='estado_interes',
            field=models.BooleanField(
                choices=[('True', 'Activo'), ('False', 'Inactivo')],
                db_column='estado_interes',
                default=True,
                max_length=5,
                verbose_name='Estado',
            ),
        ),
    ]
