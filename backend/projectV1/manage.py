#!/usr/bin/env python
import os
import sys

if 'db' not in os.environ:
    # Use SQLite for Docker build
    os.environ.setdefault('DJANGO_SETTINGS_MODULE',
                          'projectV1.settings_sqlite')
else:
    # Use regular settings
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'projectV1.settings')


def main():
    """Run administrative tasks."""
    try:
        from django.core.management import execute_from_command_line
    except ImportError as exc:
        raise ImportError(
            "Couldn't import Django."
        ) from exc
    execute_from_command_line(sys.argv)


if __name__ == '__main__':
    main()
