var registries = [{test:1},{test:2}]

var RegistryApplication = React.createClass({
  render: function() {
    return  <div><RegistryFilter/><RegistryScopeList/></div>
  }
});

var RegistryScopeList = React.createClass({
	render: function(){
		return <div className="panel-group" id="accordion">
		  <RegistryScope title="/scope1" idx="1">
            
		  </RegistryScope>
		     
		  
	      <RegistryScope title="/scope2" idx="2"/>
	   
	    </div>
			
	}
});


var RegistryFilter = React.createClass({
	render: function(){
		return <div><nav id="myNavmenu" className="navmenu navmenu-default navmenu-fixed-left offcanvas" role="navigation">
		Filter Panel Here
		</nav>
		<div className="navbar navbar-default navbar-fixed-top">
		<button type="button" className="navbar-toggle" data-toggle="offcanvas" data-target="#myNavmenu" data-canvas="body">
		<span className="icon-bar"></span>
		<span className="icon-bar"></span>
		<span className="icon-bar"></span>
		</button>
		</div></div>
	}
});

var RegistryScope = React.createClass({
	render: function(){
		
	   
		var id = this.props.idx;
	    var datatarget= "#" + id;
	    
		
	    
		return <div className="panel panel-primary">
        <div className="panel-heading">
        <h4 className="panel-title">
          <span data-toggle="collapse" data-parent="#accordion" data-target={datatarget}>{this.props.title}</span>
        </h4>
      </div>
      <div id={id} className="panel-collapse collapse">
        <div className="panel-body">
           some scope data here.
           <div className="panel-group" id="accordion">
           {this.props.children}
           </div>
	      </div>
      </div>
  </div>
	}
});



  ReactDOM.render(
    <RegistryApplication/>,
    document.getElementById('registrycontainer')
  );


