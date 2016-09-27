var registries = [{scope:"scope1"},
                  {scope:"scope2"},
                  {scope:"scope2/scope1"},
                  {scope:"scope2/scope2"}];

var RegistryApplication = React.createClass({
  render: function() {
    return  <div><RegistryFilter/><RegistryScopeList data={this.props.data}/></div>
  }
});

var RegistryScopeList = React.createClass({
	render: function(){
		var RegistryEntries= this.props.data.map(function(regentry) {
		      return (
		    		  
		    	        <RegistryScope data={regentry} idx={regentry.scope.replace(/\//g,'_')}/>
		    	          
		    	      );
		    	    });

		return <div className="panel-group" id="accordion">
		      {RegistryEntries}		      
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
		var editid = this.props.idx + "edit";
	    var datatarget= "#" + id;
	    var dataedittarget="#" + id + "edit";
	    
		
	    
		return <div className="panel panel-primary">
        <div className="panel-heading">
        <h4 className="panel-title">
          <span data-toggle="collapse" data-parent="#accordion" data-target={datatarget}>{this.props.data.scope}</span>
          <span data-toggle="collapse" data-parent="#accordion" data-target={dataedittarget} className="pull-right">edit</span>
        </h4>
      </div>
      <RegistryEntryRead id={id} data={this.props.data} title={this.props.data.scope}/>
      <RegistryEntryUpdate id={editid} data={this.props.data} title={this.props.data.scope}/>
  </div>
	}
});


var RegistryEntryUpdate = React.createClass({
	  render: function() {
	    return  <div id={this.props.id} className="panel-collapse collapse">
	    <div className="panel-body">
	    edit form here.
	    </div>
	</div>  

	  }
	});



var RegistryEntryRead = React.createClass({
  render: function() {
    return  <div id={this.props.id} className="panel-collapse collapse">
    <div className="panel-body">
    read form here.
    </div>
</div>  

  }
});

  ReactDOM.render(
    <RegistryApplication data={registries}/>,
    document.getElementById('registrycontainer')
  );


