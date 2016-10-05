/* code written by me
 * 
 */




var modalStyle = {
		  position: 'fixed',
		  fontFamily: 'Arial, Helvetica, sans-serif',
		  top: 0,
		  right: 0,
		  bottom: 0,
		  left: 0,
		  background: 'rgba(0, 0, 0, 0.8)',
		  zIndex: 99999,
		  transition: 'opacity 1s ease-in',
		  pointerEvents: 'auto',
		  overflowY: 'auto'
		}

		var containerStyle = {
		  width: '400px',
		  position: 'relative',
		  margin: '10% auto',
		  padding: '5px 20px 13px 20px',
		  background: '#fff'
		}

		var closeStyle = {
		  background: '#606061',
		  color: '#FFFFFF',
		  lineHeight: '25px',
		  position: 'absolute',
		  right: '-12px',
		  textAlign: 'center',
		  top: '-10px',
		  width: '24px',
		  textDecoration: 'none',
		  fontWeight: 'bold',
		  borderRadius: '12px',
		  boxShadow: '1px 1px 3px #000',
		  cursor: 'pointer'
		}



      var inlineStyle={
			display:"inline"
		}




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


 
var Modal = React.createClass({
	getInitialState: function() { 
         return { isModalOpen: false }; 
	}, 
	openModal:function(){
		this.setState({isModalOpen:true})
	},
	closeModal:function(){
		this.setState({isModalOpen:false})
	},
	render: function() {
		var isOpenStyle = this.state.isModalOpen?modalStyle:closeStyle;
		return (
		<div>
			<div id="hdnModal" style={isOpenStyle}>
			   <div id="container" style={containerStyle}>
			   <div onClick={this.closeModal} className="pull-right">x</div>
			   {this.props.children}
			   </div> 
			</div>
		<button type="button" onClick={this.openModal} className="btn" style={inlineStyle}>{this.props.title}</button>
		</div>);

		}
});





var RegistryApplication = React.createClass({
	render: function() {
    return <div>
	
	<RegistryEntryFilter><p>Filter Form Component here</p></RegistryEntryFilter><RegistryScopeList createRegistryClicked={this.loadCreateForm} data={this.props.data}/></div>
    }
	
	
});



var RegistryScopeList = React.createClass({
	render: function(){
		
		var RegistryScopes= this.props.data.map(function(scopes) {
		      return (
		    	 		  <RegistryScope data={scopes.regentries} key={scopes.scope} idx={scopes.scope}/>
		    	      );
		    	    });

		return (
			<div className="panel-group" id="accordion">
				<div><Modal title="Create"><h1>Create Form Component here</h1></Modal></div>
		        {RegistryScopes}      
	  	    </div>);
			
	}
});


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
		    		  <RegistryEntry key={regentry.id} data={regentry} idx={parent}/>
		    	    );
	    });
		  return (<div className="panel-group" id={parent}>
	      {RegistryEntries}		      
		    </div>);
	  }
	});


var RegistryEntryRead = React.createClass({
  render: function() {
    return  <div id={this.props.id} className="panel-collapse collapse">
    <div className="panel-body">
    <h1>Registry Entry (Read Only)</h1>
    <Modal title="Edit"><h3>Edit Form Component here.</h3></Modal>
    <Modal title="Create"><h3>Create Form Component here.</h3></Modal>
    </div>
</div>  

  }
});

var RegistryEntry = React.createClass({
	render:function(){
		var id = this.props.data.id;
		var editid = this.props.data.id + "edit";
	    var datatarget= "#" + id;
	    var dataedittarget="#" + id + "edit";
	    var dataparent="#" + this.props.idx;
	    
		
	    
		return <div className="panel panel-default">
        <div className="panel-heading">
        <h4 className="panel-title">
          <span data-toggle="collapse" data-parent={dataparent} data-target={datatarget}>{this.props.data.name}</span>
          
        </h4>
      </div>
      <RegistryEntryRead id={this.props.data.id} data={this.props.data}/>
      
  </div>
	}
})


var RegistryEntryFilter = React.createClass({
	render: function(){
		return <div><nav id="myNavmenu" className="navmenu navmenu-default navmenu-fixed-left offcanvas" role="navigation">
		 <h3>Filter</h3>
		 {this.props.children}
		
		</nav>
		<div className="navbar navbar-default navbar-fixed-top">
		<button type="button" className="navbar-toggle" data-toggle="offcanvas" data-target="#myNavmenu" data-canvas="body">
		<span className="icon-bar"></span>
		<span className="icon-bar"></span>
		<span className="icon-bar"></span>
		</button>
		</div>
		
		
		
		
		</div>
	}
});


var scopes=convertData(regentries);
ReactDOM.render(
		    <RegistryApplication data={scopes}/>,
		    document.getElementById('registrycontainer')
		  );

  
