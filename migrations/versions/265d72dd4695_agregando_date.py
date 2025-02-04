"""Agregando date

Revision ID: 265d72dd4695
Revises: efe99aba57b6
Create Date: 2025-02-03 14:18:35.147240

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '265d72dd4695'
down_revision = 'efe99aba57b6'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('posts', schema=None) as batch_op:
        batch_op.alter_column('date',
               existing_type=sa.DATE(),
               type_=sa.DateTime(),
               existing_nullable=False)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('posts', schema=None) as batch_op:
        batch_op.alter_column('date',
               existing_type=sa.DateTime(),
               type_=sa.DATE(),
               existing_nullable=False)

    # ### end Alembic commands ###
