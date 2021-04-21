exports.student_data={
    "first_name": "Arvapalli",
    "last_name": "Roopesh",
    "gender":"MALE",
    "contact":"8885623730",
    "user_name":"roopes893",
    "email": "arvapalli12345@gmail.com",
    "password": "123456",
    "program": "6039fe0832fe200a870b2e83",
    "college": "Indraprasth",
    "semester": "5",
    "university": "6039fe0832fe200a870b2e83",
    "dob":"2001-04-04",
    "isAdmin":true
}

exports.some_student_data={
    "first_name": "Arvapalli",
    "last_name": "Roopesh",
    "gender":"MALE",
    "contact":"8885623730",
    "user_name":"roopes893",
    "email": "arvapalli12345@gmail.com",
    "password": "123456",
    "program": "6039fe0832fe200a870b2e83",
    "college": "Indraprasth",
    "semester": "5",
    "university": "6039fe0832fe200a870b2e83",
    "dob":"2001-04-04"
}

exports.update_student={
    "semester": "5",
}

exports.validateprogram_data={
    name:"some name",
    university_id:"605de5ccb90be457340b142e",
    semester:[1,2,3,4]
}

exports.university_data={
    logo:'some logo',
    name:"some college"
}

exports.subject_data={
    cover:"some cover",
    semester:"1 st semester",
    name:"My name",
    description:"subject description",
    by:"some giving it",
    maximum_marks:50,
    program_id:'605deebfb90be457340b1430',
    code:"this is code of the subject"
}

exports.syllabus_data={
    subject_id:"605df8fd9e045799c1df1481",
    units:['unit1','unit2']
}

exports.paper_data={
    subject_id:"605df8fd9e045799c1df1481",
    link:"some link",
    title:"This is paper titile",
    year:2020
}

exports.annotation_data={
    paper_id: '605df8fd9e045799c1df1481',
    ann: [{
        type:'BOOKMARK',
  pageCfi: "2",
  location: {
    offsetX: 21,
    offsetY: 12,
  },
  epubCfi: 'some string',
  color: 'some colour',
  text: 'some text',
  note: 'some string',
    }]
}

exports.package_data={
    "features":[{
    	"feature":"feature 1",
    	"active":true
    }],
    "price":0,
    "discount":0,
    "life":6,
    "type":"TRIAL"
}

exports.resources_data={
    PPID:"6039fe0832fe200a870b2e83",
    datesheet:[{subject:"some subject",code:"Some code",date:Date.now()}],
    center:{college:"Some college",address:{address:"this location",lat:234,long:344}}
    // reminder:['sdcs','ererg']
}

exports.extra_message_data={
    title:"some title",
    body:"some data in body",
    actions:['DISMISS','ACCEPT']
}

exports.upload_resources_data={ 
    center:
    { address: { address: 'this location', lat: 234, long: 344 },
      college: 'Some college' },
   PPID: '6039fe0832fe200a870b2e83',
   datesheet:
    [ { _id: '6076c75f4f05d1e1e28eac83',
        subject: 'some subject',
        code: 'Some code',
        date: '2021-04-14T10:43:38.699Z' } ],
   __v: 0 }

exports.subscition_data={
    PID:'6076c75f4f05d1e1e28eac83',
    program_id:"6076c75f4f05d1e1e28eac83",
    type:'regular',
    PA_ID:'6076c75f4f05d1e1e28eac83',
    status:'ACTIVE',
    expiration:Date.now()
}

exports.update_subscition_data={
    status:"ACTIVE"
}
