import openpyxl
from .dbmodels import *
from .dbschemas import *
from .dbsettings import new_Session

INITIALDATA = "components/initial_data/"

def InitialDataFile(name: str):
    return INITIALDATA + name + ".xlsx"

def EmptyTables(tables: list):
    with new_Session() as Session:
        Session.execute("SET FOREIGN_KEY_CHECKS=0;")
        Session.commit()
        for table in tables:
            Session.execute("TRUNCATE TABLE {};".format(table))
        Session.execute("SET FOREIGN_KEY_CHECKS=1;")
        Session.commit()



def InsertLocation():
    
    EmptyTables({"City", "District", "Ward"})

    wb = openpyxl.load_workbook(InitialDataFile("Locations"))

    sheet = wb.active
    i = 1
    c = 0
    d = 0
    w = 0
    with new_Session() as Session:
        while True:
            i += 1
            cityName = sheet.cell(row=i, column=1).value
            if cityName == None:
                break
            districtName = sheet.cell(row=i, column=3).value
            wardName = sheet.cell(row=i, column=5).value
            city = Session.query(City).filter(City.Name == cityName).first()
            if city == None or city.Name != cityName:
                city = City(Name=cityName)
                Session.add(city)
                Session.commit()
                c += 1

            district = Session.query(District).filter(District.ID_City == city.ID).filter(District.Name == districtName).first()
            if district == None or district.Name != districtName:
                district = District(Name=districtName, ID_City=city.ID)
                Session.add(district)
                Session.commit()
                d += 1

            if wardName == None:
                continue
            ward = Session.query(Ward).filter(Ward.ID_District == district.ID).filter(Ward.Name == wardName).first()
            if ward == None or ward.Name!=wardName:
                ward = Ward(Name=wardName, ID_District=district.ID)
                Session.add(ward)
                Session.commit()
                w += 1

    return "Inserted {} cities, {} districts, {} wards".format(c, d, w)

def InsertPermission():
    EmptyTables({"Permission"})
    wb = openpyxl.load_workbook(InitialDataFile("Permissions"))

    sheet = wb.active
    i = 1
    p = 0

    with new_Session() as Session:
        while True:
            i += 1
            name = sheet.cell(row=i, column=1).value
            if name == None:
                break
            perm = Session.query(Permission).filter(Permission.Name == name).first()
            if perm == None or perm.Name != name:
                perm = Permission(Name=name)
                Session.add(perm)
                Session.commit()
                p += 1

    return "Inserted {} permissions".format(p)

def InsertImageType():
    EmptyTables({"ImageType"})
    wb = openpyxl.load_workbook(InitialDataFile("ImageTypes"))

    sheet = wb.active
    i = 1
    it = 0

    with new_Session() as Session:
        while True:
            i += 1
            name = sheet.cell(row=i, column=1).value
            if name == None:
                break
            imgType = Session.query(ImageType).filter(ImageType.Name == name).first()
            if imgType == None or imgType.Name != name:
                imgType = ImageType(Name=name)
                Session.add(imgType)
                Session.commit()
                it += 1

    return "Inserted {} image types".format(it)

