var http = require('http');//����httpģ��
var url = require('url');//����urlģ��
var mysql = require('mysql');//����mysqlģ��
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
});//�������ݿ�

var server = http.createServer(function(req,res){     //��������������
    var pathname = url.parse(req.url).pathname;  // ��ȡurl

//�������ݲ�������ָ����ֵ	
	if (pathname == '/test'){   //ָ��urlΪ/test��ʽ
                  var query = url.parse(req.url,true).query;  //��ȡurl�еĲ���
	var student_id = query.stu_id; 
	var class_id  = query.class_id; 
        if(student_id && class_id) {    
			var sql = 'SELECT * FROM new_table WHERE stu_id=stu_id AND class_id=class_id';   //�����ݿ�Ķ�Ӧ������ȡ����  
			connection.query(sql, function (error, result){  //��url�еĲ��������ݿ�������ӡ��ȶ�
				if (error){  
					console.log('wrong'); 
				return;
				}
				if(result){	 
					for ( var i = 0; i < result.length ; i++ ){   //�����ݵ�һ�п�ʼƥ��
							  //����ɼ�
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



			

