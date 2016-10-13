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
		return (<ReactCSSTransitionGroup 
			transitionName='modal'
			transitionEnterTimeout={1000}
			transitionLeaveTimeout={1000}
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
         return {
        	 isModalOpen: false,
           	 data:convertData([]),
           	 filterData:{scope:'*',name:'*',value:'*',confidential:'*',sensitive:false,inheritance:false}
          }; 
         
     }, 
     
   
     getData:function(filterData){
    	 searchurl = this.props.url + "/registryEntry?scope=" + filterData.scope + "&confidential=" + filterData.confidential + "&name=" + filterData.name + "&value=" + filterData.value + "&useInheritance=" + filterData.inheritance + "&matchCase=" + filterData.sensitive;
    	 
    	 $.ajax({
   	      url: searchurl,
   	      dataType: 'json',
   	      cache: false,
   	      success: function(data) {
   	    	 this.setState({data: convertData(data.list),filterData:filterData});
   	      }.bind(this),
   	      error: function(xhr, status, err) {
   	        console.error(this.props.url, status, err.toString());
   	      }.bind(this)
   	    });


     },
     
     componentDidMount: function(){
    	 this.getData(this.state.filterData);
    	          
     },
 
      openModal: function() { 
         this.setState({transitionName:'modal', isModalOpen: true }); 
     }, 
  
     closeModal: function() { 
         this.setState({ isModalOpen: false }); 
     }, 
     copyScope: function(oldScope,newScope){
    	 
    	var scopeFilterUrl = this.props.url + "/registryEntry?scope=" + oldScope.scope;
    	var newData = this.state.data;
     	var destScope = {scope:newScope.scope,regentries:[]};
    	 $.ajax({
   	      url: scopeFilterUrl,
   	      dataType: 'json',
   	      cache: false,
   	      success: function(data) {
   	          scopeData = convertData(data.list);
   	          var entriestocopy = scopeData.ScopeArray[scopeData.ScopeAssoc[oldScope.scope]].regentries;
   	         
   	    	 for(i=0;i<entriestocopy.length;i++){
   	     		destScope.regentries.push({scope:newScope.scope, name:entriestocopy[i].name,id:0});
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
   	  	    	  alert(JSON.stringify(data));
   	  	     	 newData.ScopeArray.push({scope:newScope.scope,regentries:data.list});
   	  	    	 newData.ScopeAssoc[newScope.scope] = newData.ScopeArray.length-1;
   	  	    	this.setState({data:newData})
   	  	    	
   	  	      }.bind(this),
   	  	      error: function(xhr, status, err) {
   	  	    	  alert("Error" + err.toString());
   	  	    	  alert(JSON.stringify(xhr));
   	  	        console.error(this.props.url, status, err.toString());
   	  	      }.bind(this)
   	  	    });
   	      }.bind(this),
   	      error: function(xhr, status, err) {
   	        console.error(this.props.url, status, err.toString());
   	      }.bind(this)
   	    });
    	
    	
    	/* 
    	
    	
    	 	
  	    */
     },
     
     deleteScope:function(scope){
    	 var newData = this.state.data; 
    	 var deleteArr = [];
    	 
    	 searchurl = this.props.url + "/registryEntry?scope=" + scope ;
    	 
    	 $.ajax({
   	      url: searchurl,
   	      dataType: 'json',
   	      cache: false,
   	      success: function(data) {
   	    	for(i = 0; i< data.list.length; i++){
   	   	        deleteArr.push(data.list[i].id);
   	   	     }
   	    	$.ajax({
         	      url: this.props.url + "/registryEntry/" + deleteArr.join(),
         	      type:'DELETE',
         	      cache: false,
         	      success: function(data) {
         	    	 this.getData(this.state.filterData);
         	      }.bind(this),
         	      error: function(xhr, status, err) {
         	    	  alert(status);
         	    	  alert(err.toString());
         	        console.error(this.props.url, status, err.toString());
         	      }.bind(this)
         	    });
      	 
   	      }.bind(this),
   	      error: function(xhr, status, err) {
   	        console.error(this.props.url, status, err.toString());
   	      }.bind(this)
   	    });
    	 
    	 
    	 
    	 
    	 
    	 	
    	    	 
        	 
    	 
     },
     
     searchEntries:function(searchData){
    	 this.getData(searchData); 
     },
     
     deleteEntry:function(entryid){
    	 	 $.ajax({
       	      url: this.props.url + "/registryEntry/" + entryid,
       	      type:'DELETE',
       	      cache: false,
       	      success: function(data) {
       	    	this.getData(this.state.filterData);
       	      }.bind(this),
       	      error: function(xhr, status, err) {
       	    	  alert(status);
       	    	  alert(err.toString());
       	        console.error(this.props.url, status, err.toString());
       	      }.bind(this)
       	    });
    	 
    	 
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
    
	<RegistryEntryFilterPanel><FilterForm data={this.state.filterData} onSubmit={this.searchEntries}/></RegistryEntryFilterPanel ><RegistryScopeList deleteEntryHandler={this.deleteEntry} deleteScopeHandler={this.deleteScope} copyScopeHandler={this.copyScope} data={this.state.data.ScopeArray}/></div>
    }
	
	
});



var RegistryScopeList = React.createClass({
	handleCopyScope: function(obj, oldScope,newScope){
		this.props.copyScopeHandler(oldScope,newScope)
    },
    handleDeleteScope: function(obj,scope){
    	this.props.deleteScopeHandler(scope);
    },
    handleDeleteEntry: function(obj,entryId){
    	this.props.deleteEntryHandler(entryId);
    },
    
	render: function(){
		//var items = ;
		return(<div className="panel-group" id="accordion">
		{this.props.data.map(function(scopes) {
		      var boundCopyScope = this.handleCopyScope.bind(null,this,scopes);	
		      var boundDeleteScope = this.handleDeleteScope.bind(null,this.scopes);
		      var boundDeleteEntry = this.handleDeleteEntry.bind(null,this);
		      return (
		    	 		  <RegistryScope handleDeleteEntry={boundDeleteEntry}
		    	 		    handleDeleteScope={boundDeleteScope} 
		    	 		    data={scopes.regentries}
		    	 		    key={scopes.scope}
		    	 		    idx={scopes.scope}
		    	 		    handleCopyScope={boundCopyScope} />
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
	getInitialState: function(){
		return {name:'*',value:'*',scope:'*',confidential:'*',inheritance:false,sensitive:false};
	},
	onSubmitClicked:function(e){
		e.preventDefault();
		var name=this.state.name;
		var scope=this.state.scope;
		var confidential= this.state.confidential;
		var inheritance = this.state.inheritance;
		var sensitive = this.state.sensitive;
		var value = this.state.value;
		this.props.onSubmit({name:name,value:value,scope:scope,confidential:confidential,inheritance:false,sensitive:false});
	},
	
	
	onNameChange:function(e){
		this.setState({name: e.target.value});
	},
	
	onScopeChange:function(e){
		this.setState({scope: e.target.value});
	},
	
	onValueChange:function(e){
		this.setState({value: e.target.value});
	},
	
	onConfidentialChange:function(e){
		this.setState({confidential: e.target.checked});
	},
	
	onSensitiveChange:function(e){
		this.setState({sensitive: e.target.checked});
	},
	
	onInheritanceChange:function(e){
		this.setState({inheritance: e.target.checked});
	},
	
	render:function(){
		return (<form>
		  <h3>Filter Registry Entries</h3>
		  <div class="form-group">
		    <label for="scope">Scope</label>
		    <input type="text" className="form-control" onChange={this.onScopeChange} id="scope" />
		  </div>
		  <div class="form-group">
		    <label for="name">Name:</label>
		    <input type="text" onChange={this.onNameChange} className="form-control" id="name" />
		  </div>
          <div class="form-group">
			<label for="value">Value:</label>
			<input type="text" onChange={this.onValueChange} className="form-control" id="value" />
     	  </div>
		  <hr />
		  <div className="form-group">
		   <div className="checkbox">
		    <label><input type="checkbox" id="confidential" onChange={this.onConfidentialChange}  /> Is Confidential</label>
		  </div>
		            
		  <div className="checkbox">
		    <label><input type="checkbox" id="inheritance" onChange={this.onInheritanceChange} /> Use inheritance</label>
    	  </div>
    	  
    	  <div className="checkbox">
		    <label><input type = "checkbox" id = "sensitive" onChange={this.onSensitiveChange} /> Case Sensitive</label>
          </div>
          </div>
          
          <div className="form-group row">
            <div className="offset-sm-2 col-sm-10">
              <button type="button" className="btn btn-primary pull-right" onClick={this.onSubmitClicked} >Submit</button>
            </div>
          </div>
          </form>);
          
		  
	}
});

var ConfirmationForm = React.createClass({
	render:function(){
		return (
		<div>
		  {this.props.children}
		  <button type="button" onClick={this.props.onSubmit} className="btn btn-primary pull-right">Submit</button>
		  <button type="button" onClick={this.props.onCancel} className="btn btn-primary pull-right">Cancel</button>
		</div>
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
     closeModal: function() { 
         this.setState({ isModalOpen: false }); 
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
    	 this.closeModal();
    	 this.props.handleDeleteScope(this.props.idx)
     },
     
     onHandleDeleteEntry:function(entryId){
    	 this.props.handleDeleteEntry(entryId)
     },
     
     confirmDeleteScope:function(e){
    	 e.preventDefault();
    	 this.setState({ isModalOpen: true,
 	        ModalData:<div><ConfirmationForm onCancel={this.closeModal} onSubmit={this.onHandleDeleteScope}>
 	       <h3>Confirm Delete Scope</h3>
 		   <p>Are you sure you want to delete this scope {this.props.idx}</p>
 	        </ConfirmationForm></div>});
 	 
     },
     
     openCopyScope: function(e){
        e.preventDefault();
        this.setState({ isModalOpen: true,
        ModalData:<div><h3>Copy Scope</h3><CopyScopeForm onCancel={this.closeModal} onSubmit={this.onHandleCopyScopeSubmit}/></div>   
               
		});
        
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
          <span className="panel-title pull-right"><a href="#" onClick={this.openCopyScope}><span title="Copy Scope" className="glyphicon glyphicon-share"></span></a><a href="#" onClick={this.confirmDeleteScope}><span title="delete scope" className="glyphicon glyphicon-remove"></span></a></span>
        </h4>
      </div>
      <div id={id} className="panel-collapse collapse">
	    <div className="panel-body">
	    <a href="#" onClick={this.openCreateEntry}><span title="Create Entry in this scope" className="glyphicon glyphicon-plus"></span></a> 
        <RegistryEntryList id={id} deleteEntryHandler={this.onHandleDeleteEntry} data={this.props.data}/>
	    </div>
	    </div></div>);
      
  
	}
});







var RegistryEntryList = React.createClass({
	handleDeleteEntry: function(obj,entryId){
    	this.props.deleteEntryHandler(entryId);
    },
	render: function(){
		 var parent="accordion" + this.props.id;	
	
		var items = this.props.data.map(function(entry) {
		      var boundDeleteEntry = this.handleDeleteEntry.bind(null,this.entry);
		      return (
		    		  <RegistryEntry key={entry.id} data={entry} idx={parent} handleDeleteEntry={boundDeleteEntry}/>
		    	      );
		     },this);
		return(
		
		
		<div className="panel-group" id="accordion">
        {items}
        </div>
		
			
		);
	}	
	
});


var RegistryEntryRead = React.createClass({
  render: function() {
    return  <div id={this.props.id} className="panel-collapse collapse">
    			<div className="panel-body">
    				Name: blah<br />
    				entryid: {this.props.data.id}<br />
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
     openModal: function() { 
         this.setState({ isModalOpen: true }); 
     }, 
     closeModal: function() { 
         this.setState({ isModalOpen: false }); 
     },
     
     onHandleDeleteEntry:function(){
    	 this.closeModal();
    	 this.props.handleDeleteEntry(this.props.data.id)
     },
     
     confirmDeleteEntry:function(e){
    	 e.preventDefault();
    	 this.setState({ isModalOpen: true,
 	        ModalData:<div><ConfirmationForm onCancel={this.closeModal} onSubmit={this.onHandleDeleteEntry}>
 	       <h3>Confirm Delete Entry</h3>
 		  <p>Are you sure you want to delete this Entry {this.props.data.name}</p>
 	        </ConfirmationForm></div>});
 	 
     },
     
    openEditEntry: function(e){
        e.preventDefault();
        this.setState({ isModalOpen: true,
        ModalData:<div><h3>Edit Entry</h3> 
               		<div className="body"> 
                 		<p>This is the modal&apos;s body.</p> 
               		</div> 
               		<button onClick={this.closeModal}>Close modal</button>
               	 </div> 
		});
        
     },
    
	render:function(){
		var id = this.props.data.id;
		var editid = this.props.data.id + "edit";
	    var datatarget= "#" + id;
	    var dataedittarget="#" + id + "edit";
	    var dataparent="#" + this.props.idx;
	    
		
	    
		return <div className="panel panel-default">
					<Modal isOpen={this.state.isModalOpen}> 
              			{this.state.ModalData} 
    				</Modal> 
        			<div className="panel-heading">
        				<h4 className="panel-title">
          					<span style={collapsePanelLink}  data-toggle="collapse" data-parent={dataparent} data-target={datatarget}>{this.props.data.name}</span>
          					<a href="#" className="pull-right" onClick={this.openEditEntry}><span title="edit entry" className="glyphicon glyphicon-edit"></span></a>&nbsp;
          					<a href="#" className="pull-right" onClick={this.confirmDeleteEntry}><span title="delete entry" className="glyphicon glyphicon-remove"></span></a>
           				</h4>
      		   		</div>
      		   				
    						<RegistryEntryRead id={this.props.data.id} data={this.props.data}/>
    				
      		  	</div>
	}
})


var RegistryEntryFilterPanel = React.createClass({
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
		    <RegistryApplication url="http://localhost:6969"/>,
		    document.getElementById('registrycontainer')
		  );

  

