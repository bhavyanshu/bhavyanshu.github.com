---
layout: post
title: "Export data from parse.com in json and csv format using command line [Python]"
description: "Export data from parse.com in json or csv format using command line."
tags: ["python","Parse"]
change_frequency: "weekly"
priority: 0.8
date: 2015-08-12 14:23:56
---

I personally use parse.com as backend for a lot of projects so I thought it would be nice to have a command line tool which can export parse data to json & csv format. Those who want to export data to tar.bz2 format, look at [parse-export](https://github.com/expa/parse-export). For csv or json you can use my modified script provided below. Note that it is not dependent on parse-export. You can independently use this script. I have edited the main method to generate a csv from json. Rest of it is pretty much a derivation from parse-export.

> NOTE : It will work in most cases but if the field is of pointer/array type, then it will put the complete pointer type field value under single column. Also, no dependency issue. You might wanna `pip install python-dateutil` in case you are using the datautil.parser to convert date time to better readable format.

## Code [Updated - 26/12/2015]

Update: Old script was comparing createdAt field and hence was stuck in loop. The updated code addresses that concern and has more functionality like using limit and skip functionality provided by parse API. Thanks to Janny for letting me know about this bug.

First you need to get the API keys. Open parse.com, login and select app. Go to settings, keys and copy the values of these three keys.

* Application ID
* REST API Key
* Master Key

Insert these keys in the below provided script.

 	{% highlight python %}
#!/usr/bin/python

import httplib
import json
import csv
import os
import sys
import time
import urllib
import datetime

APPLICATION_ID = ""
REST_API_KEY = "" #REST API Key
MASTER_KEY = "" #Master Key
CLASSES = "ParseClass1,ParseClass2" #Enter comma seperated classnames here, ex "User,Role" etc! Don't add space after/before comma.
skip = 0 # Skip these many rows, used in skip = skip_count*limit
limit = 10 #limit number of rows per call - Max is 1000

def getData(app_id, rest_api_key, api_endpoint, master_key=None, limit=1000, order=None, skip=None, filter_json=None, api_version=1):
    con = httplib.HTTPSConnection('api.parse.com', 443)
    con.connect()

    header_dict = {'X-Parse-Application-Id': app_id,
                   'X-Parse-REST-API-Key': rest_api_key
                   }

    if master_key is not None:
        header_dict['X-Parse-Master-Key'] = master_key

    params_dict = {}
    if order is not None:
        params_dict['order'] = order
    if limit is not None:
        params_dict['limit'] = limit
    if skip is not None:
        params_dict['skip'] = skip
    if filter_json is not None:
        params_dict['where'] = filter_json

    params = urllib.urlencode(params_dict)
    con.request('GET', '/%s/%s?%s' % (api_version, api_endpoint, params), '', header_dict)

    try:
        response = json.loads(con.getresponse().read())
    except Exception, e:
        response = None
        raise e

    return response

def main():
    print "*** Requesting...  ***\n"

    class_list = CLASSES.split(",") #For multiple classes!
    DEFAULT_CLASSES = {'User': 'users', 'Role': 'roles', 'File': 'files', 'Events': 'events', 'Installation': 'installations'}

    json_file_path = os.getcwd()

    for classname in class_list:
        results = {'results': []}
        object_count = 0
        skip_count = 0

        if classname not in DEFAULT_CLASSES.keys():
            endpoint = '%s/%s' % ('classes', classname)
        else:
            endpoint = DEFAULT_CLASSES[classname]

        sys.stdout.write(' Fetching %s table data - ' % classname)
        sys.stdout.flush()

        while True:
            startTimer = time.clock()
            skip = skip_count*limit

            response = getData(APPLICATION_ID, REST_API_KEY, endpoint, master_key=MASTER_KEY, limit = limit, skip = skip)

            if 'results' in response.keys() and len(response['results']) > 1:
                object_count += len(response['results'])
                skip_count = skip_count+1
                results['results'].extend(response['results'])
            else:
                parse_done = time.clock() - startTimer
                print ' Got: %.4f records in %.4f secs\n' % (object_count, parse_done)
                break

        with open(os.path.join(json_file_path, '%s.json' % classname), 'w') as json_file:
            json_file.write(json.dumps(results, indent=4, separators=(',', ': ')))

        print 'Generating csv... '

        with open(os.path.join(json_file_path, '%s.json' % classname), 'r') as json_file:

            data = json.load(json_file)
            f = csv.writer(open(os.path.join(json_file_path, '%s.csv' % classname), 'w'))
            #f.writerow(["objectId", "store", "messageType", "sentFrom", "createdAt"]) <- Uncomment to manually set column titles & sequence
            f.writerow(data["results"][0].keys())
            for x in data["results"]:
                # Uncomment below line to manually set sequence if you know column titles.
                #f.writerow([x["objectId"], x["store"], x["messageType"], x["sentFrom"], dateutil.parser.parse(x["createdAt"]).strftime("%d-%b-%Y, %H:%M:%S")])
                f.writerow(x.values())
            print " CSV Generated... \n"

if __name__ == '__main__':
    try:
        main()
    except Exception, e:
        raise e

	{% endhighlight %}

Save this script and execute it like

	$ python whateverscriptname.py

It will output something like

	*** Requesting...  ***

	 Fetching User table data -  Got: 6.0000 records in 0.0121 secs

	Generating csv...
	 CSV Generated...

	 Fetching Installation table data -  Got: 11.0000 records in 0.0121 secs

	Generating csv...
	 CSV Generated...

This will generate .json and .csv files for respective classes. You can use **cat** command to view the data in these files. That's all. Leave a comment below if you have any issue with it or want to suggest an improvement.


{% include JB/setup %}
