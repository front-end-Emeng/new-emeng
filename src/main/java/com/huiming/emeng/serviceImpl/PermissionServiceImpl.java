package com.huiming.emeng.serviceImpl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.PropertySource;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Service;

import com.huiming.emeng.dto.Pager;
import com.huiming.emeng.mapper.PermissionMapper;
import com.huiming.emeng.mapper.RolePermissionMapper;
import com.huiming.emeng.model.Permission;
import com.huiming.emeng.service.PermissionService;

@Service("permissionService")
@PropertySource("classpath:application.properties")
public class PermissionServiceImpl implements PermissionService {

	/**
	 * Environment变量，用于加载application.properties
	 */
	@Autowired
	private Environment env;

	/**
	 * 实现EnvironmentAware接口的方法确保environment注入成功
	 */
	public void setEnvironment(Environment env) {
		this.env = env;
	}

	@Autowired
	private PermissionMapper permissionMapper;

	@Autowired
	private RolePermissionMapper rolePermissionMapper;

	@Override
	public int deleteByPrimaryKey(Integer id) {
		return permissionMapper.deleteByPrimaryKey(id);
	}

	@Override
	public int insert(Permission record) {
		return permissionMapper.insert(record);
	}

	@Override
	public int insertSelective(Permission record) {
		return permissionMapper.insertSelective(record);
	}

	@Override
	public int updateByPrimaryKeySelective(Permission record) {
		return permissionMapper.updateByPrimaryKeySelective(record);
	}

	@Override
	public int updateByPrimaryKey(Permission record) {
		return permissionMapper.updateByPrimaryKey(record);
	}

	@Override
	public Permission selectSelective(Permission record) {
		return permissionMapper.selectSelective(record);
	}

	@Override
	public List<Permission> selectAllEffective() {
		return permissionMapper.selectAllEffective();
	}

	@Override
	public List<Permission> selectByRole(Integer id) {
		List<Permission> list = new ArrayList<>();
		if (id == Integer.parseInt(env.getRequiredProperty("role.adminId"))) {
			return permissionMapper.selectAllEffective();
		} else {
			for (Integer permissionId : rolePermissionMapper.selectAllByRoleId(id)) {
				Permission permission = permissionMapper.selectSelective(new Permission(permissionId, (byte) 1));
				if (permission != null) {
					list.add(permission);
				}
			}
		}
		return list;
	}

	@Override
	public List<Permission> selectAll() {
		return permissionMapper.selectAll();
	}

	@Override
	public Pager<Permission> selectAllEffectiveByPage(Integer currentPage, Integer pageSize) {
		int fromIndex = (currentPage - 1) * pageSize;
		int totalRecord = permissionMapper.selectCount();
		Pager<Permission> permissionPage = new Pager<>(pageSize, currentPage, totalRecord,
				permissionMapper.selectAllEffectiveByPage(fromIndex, pageSize));
		return permissionPage;
	}

}
