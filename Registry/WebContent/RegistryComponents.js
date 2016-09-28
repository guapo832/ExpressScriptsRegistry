var regentries = [{scope:"scope1", name:"some registry entry 1",id:1},
                  {scope:"scope2", name:"Some registry entry 2",id:2},
                  {scope:"scope2/subscope1", name:"some registry entry 3",id:3},
                  {scope:"scope2/subscope2", name:"some registry entry 4",id:4},
                  {scope:"scope2/subscope2", name:"some registry entry 5",id:5}];



function convertData(indata){
	var scopeArray=[];
	var scopeAssoc=[];
	var idx=0;
	for(var i=0;i<indata.length;i++){
		if(typeof(scopeAssoc[indata[i].scope]) == 'undefined'){
			scopeAssoc[indata[i].scope] = idx;
            scopeArray.push({scope:indata[i].scope,regentries:[indata[i]]});
            idx++;
		}else{
		    scopeArray[scopeAssoc[indata[i].scope]].regentries.push(indata[i]);
		}
	}
	
	return scopeArray;
}








///



var RegistryApplication = React.createClass({
  render: function() {
    return  <div><RegistryEntryFilter/><RegistryScopeList data={this.props.data}/></div>
  }
});


var RegistryScopeList = React.createClass({
	render: function(){
		var RegistryScopes= this.props.data.map(function(scopes) {
		      return (
		    		  
		    		  <RegistryScope data={scopes.regentries} idx={scopes.scope}/>
		    	          
		    	      );
		    	    });

		return (<div className="panel-group" id="accordion">
		      {RegistryScopes}      
	  	    </div>);
			
	}
});

/*
 * <div className="panel panel-primary">
        <div className="panel-heading">
        <h4 className="panel-title">
          <span data-toggle="collapse" data-parent="#accordion" data-target={datatarget}>{this.props.idx}</span>
        </h4>
      </div>
      <div id={id} className="panel-collapse collapse">
	    <div className="panel-body">
	    test
	    </div>
	    </div>
 * */
var RegistryScope = React.createClass({
	render: function(){
		
	   
		var id = this.props.idx.replace(/\//g,'_');
	    var datatarget= "#" + id;
	    
	    
		return (<div className="panel panel-primary">
        <div className="panel-heading">
        <h4 className="panel-title">
          <span data-toggle="collapse" data-parent="#accordion" data-target={datatarget}>{this.props.idx}</span>
        </h4>
      </div>
      <div id={id} className="panel-collapse collapse">
	    <div className="panel-body">
	    <RegistryEntryList id={id} data={this.props.data}/>
	    </div>
	    </div></div>);
      
  
	}
});



var RegistryEntryList = React.createClass({
	  render: function() {
		  var parent="accordion" + this.props.id;
		  var RegistryEntries= this.props.data.map(function(regentry) {
			  return (
		    		  <RegistryEntry data={regentry} idx={parent}/>
		    	    );
	    });
		  return (<div className="panel-group" id={parent}>
	      {RegistryEntries}		      
		    </div>);
	  }
	});


var RegistryEntry = React.createClass({
	render:function(){
		var id = this.props.data.id;
		var editid = this.props.data.id + "edit";
	    var datatarget= "#" + id;
	    var dataedittarget="#" + id + "edit";
	    var dataparent="#" + this.props.idx;
	    
		
	    
		return <div className="panel panel-primary">
        <div className="panel-heading">
        <h4 className="panel-title">
          <span data-toggle="collapse" data-parent={dataparent} data-target={datatarget}>{this.props.data.name}</span>
          <span data-toggle="collapse" data-parent={dataparent} data-target={dataedittarget} className="pull-right">edit</span>
        </h4>
      </div>
      <RegistryEntryRead id={this.props.data.id} data={this.props.data}/>
      <RegistryEntryUpdate id={editid} data={this.props.data}/>
  </div>
	}
})





var RegistryEntryFilter = React.createClass({
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

  
var scopes=convertData(regentries);
ReactDOM.render(
	    <RegistryApplication data={scopes}/>,
	    document.getElementById('registrycontainer')
	  );


  


