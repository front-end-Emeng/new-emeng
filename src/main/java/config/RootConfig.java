package config;

import com.huiming.emeng.interceptor.PermissionInterceptor;
import org.springframework.context.annotation.*;
import org.springframework.context.annotation.ComponentScan.Filter;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.stereotype.Controller;


/**
 * spring-config
 * 
 * @author Jack
 * @date 2017年5月15日
 */
@Configuration
@ComponentScan(basePackages={"com.huiming.emeng"},
		excludeFilters={@Filter(type = FilterType.ANNOTATION, value = Controller.class)})
@Import(DataSourceConfig.class)
@EnableScheduling
public class RootConfig {
	
	
//	@Bean(initMethod="initMethod")
//	public StartupListener startupListener() {
//		return new StartupListener();
//	}
	
	@Bean
	public PermissionInterceptor permissionInterceptor() {
		return new PermissionInterceptor();
	}
	
}