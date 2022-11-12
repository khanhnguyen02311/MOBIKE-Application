from flask import Blueprint, request, jsonify
from ..dbmodels import *
from ..dbschemas import *
from ..dbsettings import new_Session, Base, Engine
from ..inserter import *
import glob, os
from ..config import DB_NAME, STORAGE_PATH
import json
import platform

bpadmin = Blueprint('bpadmin', __name__)

@bpadmin.route('/serverinfo', methods = ['GET'])
def serverinfo():
    return jsonify({"system": platform.system(), "release": platform.release(), "version": platform.version()})

@bpadmin.route('/insertlocations', methods = ['POST'])
def insertlocations():
    print("Inserting locations...")
    return InsertLocation()

@bpadmin.route('/insertpermissions', methods = ['POST'])
def insertpermission():
    print("Inserting permissions...")
    return InsertPermission()

@bpadmin.route('/insertimagetypes', methods = ['POST'])
def insertimagetype():
    print("Inserting image types...")
    return InsertImageType()

@bpadmin.route('/initversions', methods = ['POST'])
def initversions():
    Session = new_Session()
    print("Initializing version...")
    EmptyTables({"Version"})
    Session.add(Version(Name="Locations", Version=1))
    Session.add(Version(Name="Permissions", Version=1))
    Session.add(Version(Name="ImageTypes", Version=1))
    Session.commit()
    Session.close()
    return jsonify({"msg": "Success"})


@bpadmin.route('/clearimages', methods = ['POST'])
def clearimages():
    print("Clearing images...")
    EmptyTables({"Image"})
    images = glob.glob(STORAGE_PATH + "*")
    for image in images:
        os.remove(image)
    return jsonify({"msg": "Images cleared"})

@bpadmin.route('/resetdatabase', methods = ['POST'])
def dropalltables():

    clearimages()

    print("Dropping all tables...")  
    Session = new_Session()

    Session.execute("SET FOREIGN_KEY_CHECKS = 0")
    
    commands = Session.execute("SELECT concat('DROP TABLE IF EXISTS `', table_name, '`;') FROM information_schema.tables WHERE table_schema = '" + DB_NAME + "';")

    for command in commands:
        Session.execute(command[0])

    Session.execute("SET FOREIGN_KEY_CHECKS = 1")

    print("Recreating all tables...")
    Base.metadata.create_all(Engine)

    print("Initializing database...")
    initversions()
    insertlocations()
    insertpermission()
    insertimagetype()

    # commands = Session.execute("SELECT concat('DROP TABLE IF EXISTS `', table_name, '`;') FROM information_schema.tables WHERE table_schema = '" + DB_NAME + "';")
    # commands = Session.execute("SELECT concat('DROP TABLE IF EXISTS `', table_name, '`;') FROM information_schema.tables WHERE table_schema = 'flask';")



    # print ("Commands: ", commands)

    return "Done"


    Session.execute("SET FOREIGN_KEY_CHECKS = 0")
    Session.commit()
    
    # Base.metadata.drop_all(Engine)

    Session.execute("SET FOREIGN_KEY_CHECKS = 1")
    Session.commit()

    Session.close()


    return jsonify("Done")
