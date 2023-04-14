// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function (req, res) {
  //res.status(200).json({ name: 'John Doe' });

  function convertJsontoUrlencoded(obj) {
    let str = [];
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        str.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]));
      }
    }
    return str.join('&');
  }

  require('dotenv').config()

  const API_URL = process.env.API_URL;
  const WP_CF7_CONTACTID = process.env.WP_CF7_CONTACTID;


  if ( API_URL && WP_CF7_CONTACTID ) {
    const WP_CF7_FEEDBACK = API_URL+'/wp-json/contact-form-7/v1/contact-forms/'+WP_CF7_CONTACTID+'/feedback';

    
    const body = JSON.parse(req.body);
    
    const result = await fetch(WP_CF7_FEEDBACK, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
      },
      body: convertJsontoUrlencoded(body)
    }).then((data) => {
      if (data.status === 200) {
        return data.json();
      }
    });

    res.status(200).send({result})
  } else {
    res.status(400).json({message: 'Form Error'})
  }
  
  

}
