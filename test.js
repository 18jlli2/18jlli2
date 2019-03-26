var http = require('http');
var url = require('url');
var querystring = require('querystring');
var mysql = require('mysql');
var connection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : 'ljl094813.',
    port : '3306',
    database : 'test1'
});
connection.connect();


var server = http.createServer(function(req,res){     
    var pathname = url.parse(req.url).pathname;  //����pathnameΪ ��ȡurl
	var query = url.parse(req.url,true).query;  //query ��һ����ȡurl�в����ı���
	var student_id = query.stu_id;   //����student_id Ϊ student_id�Ĳ���ֵ
	var course_id  = query.class_id; 	 //����course_id  Ϊ course_id�Ĳ���ֵ
//�������ݲ�������ָ����ֵ	
	if (pathname == '/test'){   //ȷ��urlΪ���涨�ĸ�ʽ��api�ĵ���ģ�
        if(student_id && course_id) {    // ������� student_id �� course_id
			var sql = 'SELECT * FROM new_table';   //���� sqlΪһ���ַ��� ����student_table��ȡ���ݣ�  
			connection.query(sql, function (error, result){  //��url�еĲ��������ݿ�������ӡ��ȶ�
				if (error){   //������ƥ��
					console.log('wrong'); 
				return;
				}
				if(result){	  //����ƥ�䣬��ʼ��ȡ����
					for ( var i = 0; i < result.length ; i++ ){   //�����ݵ�һ�п�ʼƥ��
							  //����ƥ��ʱ������ɼ�
						if ( result[i].class_id == course_id && result[i].stu_id == student_id ){							     
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



			

