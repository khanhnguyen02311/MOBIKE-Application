import argon2, redis
from os import environ
from components.config import SecurityConfig as scfg, AuthConfig as acfg, RedisConfig as rcfg
from authlib.integrations.flask_client import OAuth

blocklistJWT = redis.StrictRedis(
   host=rcfg.HOST, port=rcfg.PORT, db=rcfg.DB, decode_responses=rcfg.DECODE_RESPONSES, password=rcfg.PASSWORD
)

oauth = OAuth()

oauth.register(
   name='google',
   client_id=acfg.GOOGLE_CLIENT_ID,
   client_secret=acfg.GOOGLE_CLIENT_SECRET,
   access_token_url='https://accounts.google.com/o/oauth2/token',
   access_token_params=None,
   authorize_url='https://accounts.google.com/o/oauth2/auth',
   authorize_params=None,
   jwks_uri="https://www.googleapis.com/oauth2/v3/certs",
   api_base_url='https://www.googleapis.com/oauth2/v1/',
   #userinfo_endpoint='https://openidconnect.googleapis.com/v1/userinfo',
   client_kwargs={'scope': 'openid email profile'},
)


passwordhasher = argon2.PasswordHasher(time_cost=scfg.ARGON_TIMECOST, 
                                       hash_len=scfg.ARGON_HASHLEN, 
                                       salt_len=scfg.ARGON_SALTLEN, 
                                       type=scfg.ARGON_TYPE)

def make_hash(psw):
   SALT = environ.get('HASHSALT')
   psw += SALT
   hash = passwordhasher.hash(psw)
   return hash.encode('utf-8')


def check_hash(old_hash, psw):
   SALT = environ.get('HASHSALT')
   psw += SALT
   try:
      passwordhasher.verify(old_hash, psw)
      if (passwordhasher.check_needs_rehash(old_hash)): 
         return [True, True]  # correct pass, need rehash
      else: 
         return [True, False] # correct pass, don't need rehash
   except:
      return [False] # incorrect pass