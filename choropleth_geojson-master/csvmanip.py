import csv
import json

f = open("please.csv")
csv_f = csv.reader(f)

f = open("please2.csv")
second_test = csv.reader(f)

dictionary1824 = {}
dictionary2529 = {}

for row in csv_f:
    dictionary1824[row[0]] = row[1]

for row in second_test:
    dictionary2529[row[0]] = row[1]


with open("wards2.json") as f:
    data = json.load(f)

for item in data["features"]:
    identif = str(item["properties"]["WD13CD"])

    item["properties"]["data1824"] = dictionary1824.get(identif)
    item["properties"]["data2529"] = dictionary2529.get(identif)
    
    #item["properties"]["WD13CD"] = "\""+identif+"\","+"\"data"+"\":"+"\""+str(dictionary.get(identif))+"\","

with open("works.json","w") as f:
    json.dump(data,f)
    

#print(len(stringarray))

##n=0
##for item in data["features"]:
##    for item2 in item["properties"]:
##        #print(item2)
##        item2 = stringarray[n]
##        n += 1
##
##with open("jake.json","w") as f:
##    json.dump(data,f)

    
