package com.huiming.emeng.model;

public class Permission {
	@Override
	public String toString() {
		return "Permission [id=" + id + ", mapping=" + mapping + "]";
	}

	private Integer id;

	private String mapping;

	private String description;

	private String function;

	private Byte state;

	public Permission() {
		super();
	}

	public Permission(Integer id, Byte state) {
		super();
		this.id = id;
		this.state = state;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getMapping() {
		return mapping;
	}

	public void setMapping(String mapping) {
		this.mapping = mapping == null ? null : mapping.trim();
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description == null ? null : description.trim();
	}

	public String getFunction() {
		return function;
	}

	public void setFunction(String function) {
		this.function = function == null ? null : function.trim();
	}

	public Byte getState() {
		return state;
	}

	public void setState(Byte state) {
		this.state = state;
	}

	@Override
	public boolean equals(Object arg0) {
		if (arg0 != null && arg0 instanceof Permission) {
			Permission permission = (Permission) arg0;
			return mapping.equals(permission.getMapping());
		} else
			return false;

	}

}