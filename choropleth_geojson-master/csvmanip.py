import csv

f = open("please.csv")
csv_f = csv.reader(f)

dictionary = {}

for row in csv_f:
    dictionary[row[0]] = row[1]

magicarray = []

for ident,data in dictionary.items():
    print("\""+ident+"\","+"\"data"+"\":"+"\""+data+"\",")


    
