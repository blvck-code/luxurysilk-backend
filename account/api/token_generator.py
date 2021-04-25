from django.contrib.auth.tokens import PasswordResetTokenGenerator
from six import text_type

class TokenGenerator(PasswordResetTokenGenerator):
    def _make_hash_value(self, account, timestamp):
        return (
            text_type(account.pk)+text_type(timestamp)+text_type(account.is_active)
        )

generate_token=TokenGenerator()