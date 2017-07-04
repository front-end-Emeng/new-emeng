package com.huiming.emeng.serviceImpl;

import java.io.File;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class FileuploadServiceImpl {

	
	@SuppressWarnings({ "rawtypes", "deprecation", "unchecked" })
	public List<?> upload(HttpServletRequest request,
			             MultipartFile[] files)throws Exception
	   {
		   
		   List respondate = new ArrayList();

		   if(files.length>0){
			   
			   for(int i=0;i<files.length;i++){
				   String path = request.getServletContext().getRealPath("/wangEditor_images/");
				 //如果文件不为空，写入上传路劲
				   if(!files[i].isEmpty()){
					   //上传文件路劲
					   System.out.println("path:"+path);
					   String fileName = files[i].getOriginalFilename();
					   
					   request.setAttribute("filename", fileName);
					   
					   System.out.println("fileName:"+fileName);
					   File filepath = new File(path,fileName);
					   System.out.println("filepath:"+filepath);
					   //判断路劲是否存在，如果不存在就新建一个
					   if(!filepath.getParentFile().exists()){
						   filepath.getParentFile().mkdirs();
					   }
					   //将文件存到一个目标文件当中
					   
					   long str2 = Date.parse((new Date()).toString());
					   
					   String[] fStrings = fileName.split("\\.");
					   
					   String str = fStrings[0]+str2+"."+fStrings[1];
					   
					   files[i].transferTo(new File(path+File.separator+str));
					   System.out.println(str);
					   respondate.add(i, "http://localhost:8080/emeng/wangEditor_images/"+str);
				   }
			   }
		   }
		   return respondate;
	   }
	//视频上传
	  public Map<String, String> addVideoLink(HttpServletRequest request,
			   MultipartFile link)throws Exception
	   {
		  Map<String, String> map = new HashMap<>();
		  if(!link.isEmpty()){
			   String path = request.getServletContext().getRealPath("/videos/");
			   String linkName = link.getOriginalFilename();
			   File linkpath = new File(path,linkName);
			   if(!linkpath.getParentFile().exists()){
				   linkpath.getParentFile().mkdirs();
			   }
			   @SuppressWarnings("deprecation")
			   long str2 = Date.parse((new Date()).toString());
			   String[] fStrings = linkName.split("\\.");   
			   String str = fStrings[0]+str2+"."+fStrings[1];
			   
			   link.transferTo(new File(path+File.separator+str));
			   
			   map.put("linkName", linkName);
			   map.put("link", "http://localhost:8080/emeng/videos/"+str);
		   }
		   return map;

	   }
	
	//视频图片上传
	  public String addVideoPic(HttpServletRequest request,
			   MultipartFile pic)throws Exception
	   {
		   String string=null;
		   if(!pic.isEmpty()){
			   String path = request.getServletContext().getRealPath("/images/");
			   String picName = pic.getOriginalFilename();
			   File picpath = new File(path,picName);
			   if(!picpath.getParentFile().exists()){
				   picpath.getParentFile().mkdirs();
			   }
			   @SuppressWarnings("deprecation")
				long str2 = Date.parse((new Date()).toString());
				String[] fStrings = picName.split("\\.");   
				   String str = fStrings[0]+str2+"."+fStrings[1];
				   
			   pic.transferTo(new File(path+File.separator+str));
			   string = "http://localhost:8080/emeng/images/"+str;
		   }
		   return string;
	   }
	
	
	
	
}
