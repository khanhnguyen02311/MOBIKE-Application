import openpyxl
from .dbmodels import *
from .dbschemas import *
from .dbsettings import new_Session
INITIALDATA = "components/initial_data/"

def InitialDataFile(name: str):
    return INITIALDATA + name + ".xlsx"

def TruncateTables(tables: list):
    Session = new_Session()
    Session.execute("SET FOREIGN_KEY_CHECKS=0;")
    Session.commit()
    for table in tables:
        try:
            Session.execute("TRUNCATE TABLE {};".format(table))
        except Exception as e:
            if "1146" in str(e):
                print("Table {} does not exist".format(table))
            else:
                print("Truncate table {} error: {}".format(table,e))

    Session.execute("SET FOREIGN_KEY_CHECKS=1;")
    Session.commit()
    Session.close()


def InsertLocation():
    
    TruncateTables({"City", "District", "Ward"})

    wb = openpyxl.load_workbook(InitialDataFile("Locations"))

    sheet = wb.active
    i = 1
    c = 0
    d = 0
    w = 0
    Session = new_Session()
    cities = []
    districts = []
    wards = []
    
    while True:
        i += 1
        cityName = sheet.cell(row=i, column=1).value
        if cityName == None:
            break
        districtName = sheet.cell(row=i, column=3).value
        wardName = sheet.cell(row=i, column=5).value

        if cityName not in cities:
            city = City(Name=cityName)
            Session.add(city)
            cities.append(cityName)
            c += 1
        
        cityID = c

        tempDistrict = {
            "Name": districtName,
            "CityID": cityID
        }

        if tempDistrict not in districts:
            district = District(Name=districtName, ID_City=cityID)
            Session.add(district)
            districts.append(tempDistrict)
            d += 1

        districtID = d

        if wardName == None:
            continue

        tempWard = {
            "Name": wardName,
            "DistrictID": districtID
        }

        if tempWard not in wards:
            ward = Ward(Name=wardName, ID_District=districtID)
            Session.add(ward)
            wards.append(tempWard)
            w += 1

    Session.commit()
    Session.close()

    return "Inserted {} cities, {} districts, {} wards".format(c, d, w)

def InsertPermission():
    TruncateTables({"Permission"})
    wb = openpyxl.load_workbook(InitialDataFile("Permissions"))

    sheet = wb.active
    i = 1
    p = 0

    Session = new_Session()
    while True:
        i += 1
        name = sheet.cell(row=i, column=1).value
        if name == None:
            break
        perm = Session.query(Permission).filter(Permission.Name == name).first()
        if perm == None or perm.Name != name:
            perm = Permission(Name=name)
            Session.add(perm)
            p += 1

    Session.commit()
    Session.close()

    return "Inserted {} permissions".format(p)

def InsertImageType():
    TruncateTables({"ImageType"})
    wb = openpyxl.load_workbook(InitialDataFile("ImageTypes"))
    Session = new_Session()
    sheet = wb.active
    i = 1
    it = 0
    while True:
        i += 1
        name = sheet.cell(row=i, column=1).value
        if name == None:
            break
        imgType = Session.query(ImageType).filter(ImageType.Name == name).first()
        if imgType == None or imgType.Name != name:
            imgType = ImageType(Name=name)
            Session.add(imgType)
            it += 1

    Session.commit()
    Session.close

    return "Inserted {} image types".format(it)

