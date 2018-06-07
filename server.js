const express = require('express');
const app = express();
const request = require('request-promise');
const PORT = process.env.port || 9000;
const HEADERS = {  //伪造请求头
    'authority': 'c.y.qq.com',
    'referer': 'https://m.y.qq.com/',
    'user-agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1',
    'origin': 'https://m.y.qq.com'
};

app.get('/', async (req, res) => {   //  首页
    const url = `https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg?g_tk=5381&uin=0&format=json&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1&_=${+ new Date()}`;
    try {
        res.json(await request({
            uri: url,
            json: true,
            headers: HEADERS
        }));

    } catch (e) {
        res.json({error: e.message})
    }
})



app.get('/search',async(req,res) =>{
    const {keyword,page = 1} = req.query;
    const url = `https://c.y.qq.com/soso/fcgi-bin/search_for_qq_cp?g_tk=5381&uin=0&format=json&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1&w=${encodeURIComponent(keyword)}&zhidaqu=1&catZhida=1&t=0&flag=1&ie=utf-8&sem=1&aggr=0&perpage=20&n=20&p=${page}&remoteplace=txt.mqq.all&_=${+ new Date()}`;
   try{
       res.json(await request({
           uri: url,
           json: true,
           headers: HEADERS
       }))
   } catch (e) {
       res.json({error: e.message})
   }

})



app.listen(9000);




