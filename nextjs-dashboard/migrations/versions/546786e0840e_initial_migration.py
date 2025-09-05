"""Initial migration

Revision ID: 546786e0840e
Revises: 
Create Date: 2024-08-17 11:37:12.034203

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision = '546786e0840e'
down_revision = None
branch_labels = None
depends_on = None

def upgrade():
    # Create new tables
    op.create_table('api_call_summary',
        sa.Column('date', sa.Date(), nullable=False),
        sa.Column('total_calls', sa.Integer(), nullable=False),
        sa.Column('success_calls', sa.Integer(), nullable=False),
        sa.Column('failure_calls', sa.Integer(), nullable=False),
        sa.PrimaryKeyConstraint('date')
    )
    op.create_table('least_used_api',
        sa.Column('api_name', sa.String(length=100), nullable=False),
        sa.Column('call_count', sa.Integer(), nullable=False),
        sa.PrimaryKeyConstraint('api_name')
    )
    op.create_table('most_used_api',
        sa.Column('api_name', sa.String(length=100), nullable=False),
        sa.Column('call_count', sa.Integer(), nullable=False),
        sa.PrimaryKeyConstraint('api_name')
    )
    
    # Drop the old users table
    op.drop_table('users')

    # Recreate the users table with the correct columns
    op.create_table('users',
        sa.Column('id', sa.String(), primary_key=True),
        sa.Column('first_name', sa.String(length=255), nullable=False),
        sa.Column('last_name', sa.String(length=255), nullable=False),
        sa.Column('email', sa.String(length=255), nullable=False, unique=True),
        sa.Column('phone_number', sa.String(length=20), nullable=True),
        sa.Column('password_hash', sa.String(length=128), nullable=False),
        sa.Column('is_admin', sa.Boolean(), nullable=False, server_default=sa.text('false')),
        sa.Column('is_active', sa.Boolean(), nullable=False, server_default=sa.text('true')),
        sa.Column('is_validated', sa.Boolean(), nullable=False, server_default=sa.text('false')),
        sa.Column('created_at', sa.DateTime(), nullable=False, server_default=sa.func.now())
    )

    # Alter existing tables
    with op.batch_alter_table('api_call', schema=None) as batch_op:
        batch_op.alter_column('id',
            existing_type=sa.INTEGER(),
            type_=sa.String(),
            existing_nullable=False)
        batch_op.alter_column('status',
            existing_type=sa.VARCHAR(length=20),
            type_=sa.String(length=10),
            existing_nullable=False)
        batch_op.alter_column('created_at',
            existing_type=postgresql.TIMESTAMP(),
            nullable=False)
        batch_op.create_unique_constraint(None, ['id'])
        batch_op.drop_column('parameters')
        batch_op.drop_column('headers')
        batch_op.drop_column('payload')
        batch_op.drop_column('client_name')
        batch_op.drop_column('response')

def downgrade():
    # Drop new tables
    op.drop_table('most_used_api')
    op.drop_table('least_used_api')
    op.drop_table('api_call_summary')
    
    # Drop the recreated users table
    op.drop_table('users')

    # Recreate the old users table
    op.create_table('users',
        sa.Column('id', sa.INTEGER(), primary_key=True, autoincrement=True),
        sa.Column('first_name', sa.String(length=255), nullable=False),
        sa.Column('last_name', sa.String(length=255), nullable=False),
        sa.Column('email', sa.String(length=255), nullable=False, unique=True),
        sa.Column('phone_number', sa.String(length=20), nullable=True),
        sa.Column('password_hash', sa.TEXT(), nullable=False),
        sa.Column('is_admin', sa.Boolean(), nullable=True, server_default=sa.text('false')),
        sa.Column('is_active', sa.Boolean(), nullable=True, server_default=sa.text('true')),
    )

    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.drop_constraint(None, type_='unique')
        batch_op.alter_column('created_at',
            existing_type=postgresql.TIMESTAMP(),
            nullable=True)
        batch_op.alter_column('is_admin',
            existing_type=sa.Boolean(),
            nullable=True)
        batch_op.alter_column('is_active',
            existing_type=sa.Boolean(),
            nullable=True)
        batch_op.alter_column('id',
            existing_type=sa.String(),
            type_=sa.INTEGER(),
            existing_nullable=False)
        batch_op.drop_column('is_validated')
        batch_op.drop_column('password_hash')

    with op.batch_alter_table('api_call', schema=None) as batch_op:
        batch_op.add_column(sa.Column('response', sa.TEXT(), autoincrement=False, nullable=True))
        batch_op.add_column(sa.Column('client_name', sa.VARCHAR(length=100), autoincrement=False, nullable=False))
        batch_op.add_column(sa.Column('payload', sa.TEXT(), autoincrement=False, nullable=True))
        batch_op.add_column(sa.Column('headers', sa.TEXT(), autoincrement=False, nullable=True))
        batch_op.add_column(sa.Column('parameters', sa.TEXT(), autoincrement=False, nullable=True))
        batch_op.drop_constraint(None, type_='unique')
        batch_op.alter_column('created_at',
            existing_type=postgresql.TIMESTAMP(),
            nullable=True)
        batch_op.alter_column('status',
            existing_type=sa.String(length=10),
            type_=sa.VARCHAR(length=20),
            existing_nullable=False)
        batch_op.alter_column('id',
            existing_type=sa.String(),
            type_=sa.INTEGER(),
            existing_nullable=False)
