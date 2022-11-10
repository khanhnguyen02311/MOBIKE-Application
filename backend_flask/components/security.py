import argon2
from os import environ
from components.config import SecurityConfig as cfg

ph = argon2.PasswordHasher(time_cost=cfg.ARGON_TIMECOST, 
                           hash_len=cfg.ARGON_HASHLEN, 
                           salt_len=cfg.ARGON_SALTLEN, 
                           type=cfg.ARGON_TYPE)


def make_hash(psw):
   SALT = environ.get('HASHSALT')
   psw += SALT
   hash = ph.hash(psw)
   return hash.encode('utf-8')


def check_hash(old_hash, psw):
   SALT = environ.get('HASHSALT')
   psw += SALT
   try:
      ph.verify(old_hash, psw)
      if (ph.check_needs_rehash(old_hash)): 
         return [True, True]  # correct pass, need rehash
      else: 
         return [True, False] # correct pass, don't need rehash
   except:
      return [False] # incorrect pass
   

def testhash(psw):
   return make_hash(psw)