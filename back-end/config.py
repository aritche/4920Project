import os

class Config(object):
    DATABASE_URL = 'PLACEHOLDER'

    #configurations for cloud sql
    SECRET_KEY = 'secret'
    DATA_BACKEND = 'cloudsql'
    PROJECT_ID = 'ulive-213323'
    CLOUDSQL_USER = 'ulive'
    CLOUDSQL_PASSWORD = 'ulive'
    CLOUDSQL_DATABASE = 'ulivedatabase'
    CLOUDSQL_CONNECTION_NAME = 'ulive-213323:australia-southeast1:lib'

    # The CloudSQL proxy is used locally to connect to the cloudsql instance.
    # To start the proxy, use:
    #
    #   $ cloud_sql_proxy -instances=your-connection-name=tcp:3306

    # Local MySQL instance URI for testing.
    LOCAL_SQLALCHEMY_DATABASE_URI = (
        'mysql+pymysql://{user}:{password}@127.0.0.1:3306/{database}').format(
            user=CLOUDSQL_USER, password=CLOUDSQL_PASSWORD,
            database=CLOUDSQL_DATABASE)

    # When running on App Engine a unix socket is used to connect to the cloudsql
    # instance.
    LIVE_SQLALCHEMY_DATABASE_URI = (
        'mysql+pymysql://{user}:{password}@localhost/{database}'
        '?unix_socket=/cloudsql/{connection_name}').format(
            user=CLOUDSQL_USER, password=CLOUDSQL_PASSWORD,
            database=CLOUDSQL_DATABASE, connection_name=CLOUDSQL_CONNECTION_NAME)

    if os.environ.get('GAE_INSTANCE'):
        SQLALCHEMY_DATABASE_URI = LIVE_SQLALCHEMY_DATABASE_URI
    else:
        SQLALCHEMY_DATABASE_URI = LOCAL_SQLALCHEMY_DATABASE_URI