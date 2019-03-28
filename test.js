var http = require('http');//请求http模块
var url = require('url');//请求url模块
var mysql = require('mysql');//请求mysql模块
var connection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : 'ljl094813.',
    port : '3306',
    database : 'test1'
});

connection.connect(function(err) {
    if(err) {
        console.log("connect wrong");
    }else{
        console.log("connect right");
    }
});//连接数据库

var server = http.createServer(function(req,res){     //创建服务器对象
    var pathname = url.parse(req.url).pathname;  // 获取url

//三、根据参数返回指定数值	
	if (pathname == '/test'){   //指定url为/test格式
                  var query = url.parse(req.url,true).query;  //获取url中的参数
	var student_id = query.stu_id; 
	var class_id  = query.class_id; 
        if(student_id && class_id) {    
			var sql = 'SELECT * FROM new_table WHERE stu_id=stu_id AND class_id=class_id';   //从数据库的对应表中提取数据  
			connection.query(sql, function (error, result){  //将url中的参数与数据库进行连接、比对
				if (error){  
					console.log('wrong'); 
				return;
				}
				if(result){	 
					for ( var i = 0; i < result.length ; i++ ){   //从数据第一行开始匹配
							  //输出成绩
						if ( result[i].class_id == class_id && result[i].stu_id == student_id ){							     
						    res.write('grades:'+result[i].grades); 	
						break;						
						}	
					}	
				} 				
			res.end();			
			});
		};
			
    };
}).listen(3000);



			

