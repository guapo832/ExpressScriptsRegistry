/* code written by me
 * 
 */


var collapsePanelLink={
    cursor:'pointer'
}

var filterPanelStyle = {
		padding:'10px',
}

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
		  width: '600px',
		  height:'auto',
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
	var scopeAssoc={};
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
	
	
	
	return {ScopeArray:scopeArray,ScopeAssoc:scopeAssoc};
}

var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;
 
var Modal = React.createClass({
	render: function() {
	if(this.props.isOpen){
		return (<ReactCSSTransitionGroup transitionName={this.props.transitionName}
			transitionEnterTimeout={5000}
			transitionLeaveTimeout={3000}
			transitionAppear={true} >
					<div>
						<div style={modalStyle}>
							<div style={containerStyle}>
								{this.props.children}
							</div>
						</div> 
					</div>
				</ReactCSSTransitionGroup>
		        
       );
    } else {
    	return null;
    }
	    
	}
});





var RegistryApplication = React.createClass({
	getInitialState: function() { 
         return { isModalOpen: false, data:convertData([])}; 
     }, 
     
     componentDidMount: function(){
    	 $.ajax({
    	      url: this.props.url + "/registryEntry",
    	      dataType: 'json',
    	      cache: false,
    	      success: function(data) {
    	    	 this.setState({data: convertData(data.list)});
    	      }.bind(this),
    	      error: function(xhr, status, err) {
    	        console.error(this.props.url, status, err.toString());
    	      }.bind(this)
    	    });

         
     },
 
      openModal: function() { 
         this.setState({ isModalOpen: true }); 
     }, 
  
     closeModal: function() { 
         this.setState({ isModalOpen: false }); 
     }, 
     copyScope: function(oldScope,newScope){
    	var newData = this.state.data;
    	var destScope = {scope:newScope.scope,regentries:[]};
    	
    	for(i=0;i<oldScope.regentries.length;i++){
    		destScope.regentries.push({scope:newScope.scope, name:oldScope.regentries[i].name,id:0});
    	}
    	
    	var newList = {list:destScope.regentries,totalCount:destScope.regentries.length}
    	 	$.ajax({
  	      url: this.props.url + "/registryEntry/batch",
  	      type: "POST",
  	      dataType: 'json',
  	      data:JSON.stringify(newList),
  	      processData:false,
  	      cache: false,
  	      contentType:'application/json',
  	      success: function(data) {
  	    	  
  	    	 newData.ScopeArray.push({scope:newScope.scope,regentries:data.list});
  	    	 newData.ScopeAssoc[newScope.scope] = newData.ScopeArray.length-1;
  	    	 alert(JSON.stringify(data));
  	    	this.setState({data:newData})
  	    	
  	      }.bind(this),
  	      error: function(xhr, status, err) {
  	    	  alert("Error" + err.toString());
  	    	  alert(JSON.stringify(xhr));
  	        console.error(this.props.url, status, err.toString());
  	      }.bind(this)
  	    });
    			
    	 
    	  	 
    	 
    	
    	 
     },
     
     deleteScope:function(scope){
    	 var newData = this.state.data;
    	 var idx = newData.ScopeAssoc[scope]
    	 
    	 
    	 	 newData.ScopeArray.splice(idx,1);
    	 this.setState({data:newData});
     },
 	render: function() {
 		
 	
    return <div>
   	 <a href="#" onClick={this.openModal}><span className="glyphicon glyphicon-plus-sign" title="Add Entry"></span></a> 
        <Modal isOpen={this.state.isModalOpen} transitionName="modal-anim"> 
              <h3>My Modal</h3> 
               <div className="body"> 
                 <p>This is the modal&apos;s body.</p> 
               </div> 
               <button onClick={this.closeModal}>Close modal</button> 
        </Modal>      
    
	<RegistryEntryFilter><FilterForm/></RegistryEntryFilter><RegistryScopeList deleteScopeHandler={this.deleteScope} copyScopeHandler={this.copyScope} data={this.state.data.ScopeArray}/></div>
    }
	
	
});



var RegistryScopeList = React.createClass({
	handleCopyScope: function(oldScope,newScope){
		this.props.copyScopeHandler(oldScope,newScope)
    },
    handleDeleteScope: function(scope){
    	this.props.deleteScopeHandler(scope);
    },
	render: function(){
		return(<div className="panel-group" id="accordion">
			{this.props.data.map(function(scopes) {
		      var boundCopyScope = this.handleCopyScope.bind(this,scopes);	
		      var boundDeleteScope = this.handleDeleteScope.bind(this.scopes);
		      return (
		    	 		  <RegistryScope handleDeleteScope={boundDeleteScope} handleCopyScope={boundCopyScope}  data={scopes.regentries} key={scopes.scope} idx={scopes.scope}/>
		    	      );
		     },this)}
			</div>
		);
	}
});


var CopyScopeForm = React.createClass({

	getInitialState: function(){
		return{scope:''};
	},
   handleCancel: function(){
      this.props.onCancel();
   },
   
   handleScopeChange: function(e){
   	 this.setState({scope: e.target.value});
   },
   
   handleSubmit: function(e){
      //TODO do submit
      e.preventDefault();
      var scope=this.state.scope;
      //todo send request to server
      this.props.onSubmit({scope:scope});
   },
   render: function(){
      return (<form>
    <div className="form-group row">
      <label for="txtScope" className="col-sm-2 col-form-label">Scope</label>
      <div className="col-sm-10">
        <input type="text" className="form-control" onChange={this.handleScopeChange} id="txtScope" placeholder="Scope"/>
      </div>
    </div>
          
    <div className="form-group row">
      <div className="offset-sm-2 col-sm-10">
        <button type="submit" className="btn btn-primary" onClick={this.handleSubmit}>Submit</button>
        <button type="button" className="btn btn-primary" onClick={this.handleCancel}>Cancel</button>
      </div>
    </div>
  </form>);
   }
});

var CreateRegistryEntryForm = React.createClass({
	render:function(){
		return (<div>
		<h1>This form to Needs to be developed by team</h1>
		<button className="btn btn-primary pull-right" onClick={this.handleCancel}>Cancel</button></div>);
	}
});


var FilterForm = React.createClass({
	render:function(){
		return (
		<form>
		  <h3>Filter Registry Entries</h3>
		  <div class="form-group">
		    <label for="scope">Scope</label>
		    <input type="text" class="form-control" id="scope"/>
		  </div>
		  <div class="form-group">
		    <label for="name">Name:</label>
		    <input type="text" class="form-control" id="name"/>
		  </div>
		  <div class="checkbox">
		    <label><input type="checkbox" id="confidential"/>Is Confidential</label>
		  </div>
		  
		  <button type="submit" class="btn btn-primary pull-right">Submit</button>
		</form>
		);
	}
});


var RegistryScope = React.createClass({
	 getInitialState: function() { 
         return { isModalOpen: false,
         		ModalData:null
          }; 
         
     }, 
 
     openModal: function() { 
         this.setState({ isModalOpen: true }); 
     }, 
 
     openCreateEntry: function(){
        
        this.setState({ isModalOpen: true,
        ModalData:<div><h3>CreateEntry</h3> 
               <CreateRegistryEntryForm/></div>
		});
        
     },
     
     onHandleCopyScopeSubmit:function(newScope){
    	this.props.handleCopyScope(newScope);
        //TODO add copy functionality;
        this.closeModal();
     },
     
     onHandleDeleteScope:function(){
    	  this.props.handleDeleteScope(this.props.idx)
     },
     
     openCopyScope: function(){
        
        this.setState({ isModalOpen: true,
        ModalData:<div><h3>Copy Scope</h3><CopyScopeForm onCancel={this.closeModal} onSubmit={this.onHandleCopyScopeSubmit}/></div>   
               
		});
        
     },
     closeModal: function() { 
         this.setState({ isModalOpen: false }); 
     },
     
	render: function(){
		
	   
		var id = this.props.idx.replace(/\//g,'_');
	    var datatarget= "#" + id;
	    
	    
		return (<div className="panel panel-primary">
		<Modal isOpen={this.state.isModalOpen} transitionName="modal-anim"> 
              {this.state.ModalData} 
        </Modal> 
        <div className="panel-heading">
        <h4 className="panel-title">
          <span style={collapsePanelLink} data-toggle="collapse" data-parent="#accordion" data-target={datatarget}>{this.props.idx}</span>
          <span className="panel-title pull-right"><a href="#" onClick={this.openCopyScope}><span title="Copy Scope" className="glyphicon glyphicon-share"></span></a><a href="#" onClick={this.onHandleDeleteScope}><span title="delete scope" className="glyphicon glyphicon-remove"></span></a></span>
        </h4>
      </div>
      <div id={id} className="panel-collapse collapse">
	    <div className="panel-body">
	    <a href="#" onClick={this.openCreateEntry}><span title="Create Entry in this scope" className="glyphicon glyphicon-plus"></span></a> 
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
    				Name: blah
    				Confidential
    				<h1>Registry Entry (Read Only)</h1>
       			</div>
       		</div>
  

  }
});

var RegistryEntry = React.createClass({
	getInitialState: function() { 
         return { isModalOpen: false,
         		ModalData:null
          }; 
         
     }, 
    openEditEntry: function(){
        
        this.setState({ isModalOpen: true,
        ModalData:<div><h3>Edit Entry</h3> 
               		<div className="body"> 
                 		<p>This is the modal&apos;s body.</p> 
               		</div> 
               		<button onClick={this.closeModal}>Close modal</button>
               	 </div> 
		});
        
     },
     closeModal: function() { 
         this.setState({ isModalOpen: false }); 
     },
	render:function(){
		var id = this.props.data.id;
		var editid = this.props.data.id + "edit";
	    var datatarget= "#" + id;
	    var dataedittarget="#" + id + "edit";
	    var dataparent="#" + this.props.idx;
	    
		
	    
		return <div className="panel panel-default">
					<Modal isOpen={this.state.isModalOpen} transitionName="modal-anim"> 
              			{this.state.ModalData} 
    				</Modal> 
        			<div className="panel-heading">
        				<h4 className="panel-title">
          					<span style={collapsePanelLink}  data-toggle="collapse" data-parent={dataparent} data-target={datatarget}>{this.props.data.name}</span>
          					<a href="#" className="pull-right" onClick={this.openEditEntry}><span title="edit entry" className="glyphicon glyphicon-edit"></span></a>&nbsp;
          					<a href="#" className="pull-right" onClick={this.deleteScope}><span title="delete entry" className="glyphicon glyphicon-remove"></span></a>
           				</h4>
      		   		</div>
      		   				
    						<RegistryEntryRead id={this.props.data.id} data={this.props.data}/>
    				
      		  	</div>
	}
})


var RegistryEntryFilter = React.createClass({
	render: function(){
		return <div><nav id="myNavmenu" style={filterPanelStyle} className="navmenu navmenu-default navmenu-fixed-left offcanvas" role="navigation">
		 
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

//var convertedData =convertData(regentries); 

React.render(
		    <RegistryApplication url="http://localhost:8090"/>,
		    document.getElementById('registrycontainer')
		  );

  

