package com.huiming.emeng.serviceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.huiming.emeng.dto.Pager;
import com.huiming.emeng.mapper.ApplyMapper;
import com.huiming.emeng.model.Apply;
import com.huiming.emeng.service.ApplyService;

@Service("applyService")
public class ApplyServiceImpl implements ApplyService {

	@Autowired
	private ApplyMapper applyMapper;
	
    /*
     * 后台生成报名表
     * @see com.huiming.emeng.service.UserService#insert(com.huiming.emeng.model.Apply)
     */
	public void insert(Apply apply) {
		applyMapper.insert(apply);
	}
    /*
     * 后台查询全部报名表的信息 （管理员）
     * @see com.huiming.emeng.service.UserService#selectApplys()
     */
	public List<Apply> selectAllApply() {
		return applyMapper.selectAllApply();
	}
	
	/*
	 * 根据主键删除
	 * @see com.huiming.emeng.service.UserService#deleteByPrimaryKey(java.lang.Integer)
	 */
	public int deleteByPrimaryKey(Integer id) {
		// TODO Auto-generated method stub
		return applyMapper.deleteByPrimaryKey(id);
	}
	@Override
	public int insertSelective(Apply record) {
		// TODO Auto-generated method stub 
		return 0; 
	}
	//根据主键查找
	@Override
	public Apply selectByPrimaryKey(Integer id) {
		// TODO Auto-generated method stub
		return applyMapper.selectByPrimaryKey(id);
	}
	//根据user_id进行更新
	public int updateByPrimaryKeySelective(Apply record) {
		
		return applyMapper.updateByPrimaryKeySelective(record);
	}
	
	//根据主键id进行更新
	public int updateByPrimaryKey(Apply record) {
		// TODO Auto-generated method stub
		return applyMapper.updateByPrimaryKey(record);
	}
	@Override
	public Pager<Apply> selectApplyWithPagesizeFromFromindex(Integer pageNum, Integer pageSize) {
		//总记录
		Integer totalRecord = applyMapper.selectNumberfromApply();
		
		//总页数
		Integer totalPage = totalRecord/pageSize;
	
		if (totalRecord ==0) {
			return null;
		}
		
		if(totalRecord % pageSize !=0){
			totalPage++;
		}
		if(pageNum > totalPage){
        pageNum = totalPage;
		}
		
		Integer fromIndex = (pageNum - 1) * pageSize;
		Pager<Apply> pager = new Pager<Apply>(pageSize, pageNum, totalRecord, totalPage, 
				applyMapper.selectApplyWithPagesizeFromFromindex(fromIndex, pageSize));
		return pager;
	}
}
