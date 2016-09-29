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



//


//
var CreateModal = React.createClass({
	handleCreateClick:function(){
		this.loadCreateForm(this.props.scope);
	},	


	loadCreateForm: function(scopeId) {
	 	
	
	   bootbox.dialog({
	            message:$('#hdnModal').html(),                
	            title: "Create Registry Entry",
	            buttons:{
	            	confirm:{
	            		label:'Save',
	            		className:'btn',
	            		callback:function(result){alert('testing');}
	            	},
	            	cancel:{
	            		label:'Cancel',
	            		className:'btn',
	            		callback:function(result){
	            			alert('cancle');
	            		}
	            	}
	            },
	            onEscape: function () {alert('escape')}
	   });
	        
	},	
	render: function() {
	
	var hdnModal={
		display:'none'
	}
	
	return (
	<div>
		<div style={hdnModal} id="hdnModal">
		 <input type="button" className="btn btn-primary" value="test"/>
		<div className="form-group">
	    <label for="exampleInputEmail1">Email address</label>
	    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
	    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
	  </div>
	  <div className="form-group">
	    <label for="exampleInputPassword1">Password</label>
	    <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password"/>
	  </div>
	  <div className="form-group">
	    <label for="exampleSelect1">Example select</label>
	    <select className="form-control" id="exampleSelect1">
	      <option>1</option>
	      <option>2</option>
	      <option>3</option>
	      <option>4</option>
	      <option>5</option>
	    </select>
	  </div>
	  <div className="form-group">
	    <label for="exampleSelect2">Example multiple select</label>
	    <select multiple class="form-control" id="exampleSelect2">
	      <option>1</option>
	      <option>2</option>
	      <option>3</option>
	      <option>4</option>
	      <option>5</option>
	    </select>
	  </div>
	  <div class="form-group">
	    <label for="exampleTextarea">Example textarea</label>
	    <textarea className="form-control" id="exampleTextarea" rows="3"></textarea>
	  </div>
	  <div class="form-group">
	    <label for="exampleInputFile">File input</label>
	    <input type="file" className="form-control-file" id="exampleInputFile" aria-describedby="fileHelp"/>
	    <small id="fileHelp" className="form-text text-muted">This is some placeholder block-level help text for the above input. It's a bit lighter and easily wraps to a new line.</small>
	  </div>
	  <fieldset class="form-group">
	    <legend>Radio buttons</legend>
	    <div class="form-check">
	      <label class="form-check-label">
	        <input type="radio" className="form-check-input" name="optionsRadios" id="optionsRadios1" value="option1" checked/>
	        Option one is this and that&mdash;be sure to include why it's great
	      </label>
	    </div>
	    <div className="form-check">
	    <label className="form-check-label">
	        <input type="radio" className="form-check-input" name="optionsRadios" id="optionsRadios2" value="option2"/>
	        Option two can be something else and selecting it will deselect option one
	      </label>
	    </div>
	    <div className="form-check disabled">
	    <label className="form-check-label">
	        <input type="radio" className="form-check-input" name="optionsRadios" id="optionsRadios3" value="option3" disabled/>
	        Option three is disabled
	      </label>
	    </div>
	  </fieldset>
	  <div class="form-check">
	    <label class="form-check-label">
	      <input type="checkbox" className="form-check-input"/>
	      Check me out
	    </label>
	  </div>

		
		
       </div>
	   <button type="button" onClick={this.handleCreateClick} className="btn">create</button>
	</div>);

	}
});



var EditModal = React.createClass({
	handleCreateClick:function(){
		this.loadCreateForm(this.props.scope);
	},	


	loadCreateForm: function(scopeId) {
	 	
	
	   bootbox.dialog({
	            message:$('#hdnModal').html(),                
	            buttons:{
	            	confirm:{
	            		label:'Save',
	            		className:'btn',
	            		callback:function(result){alert('testing');}
	            	},
	            	cancel:{
	            		label:'Cancel',
	            		className:'btn',
	            		callback:function(result){
	            			alert('cancle');
	            		}
	            	}
	            },
	            onEscape: function () {alert('escape')}
	   });
	        
	},	
	render: function() {
	
	var hdnModal={
		display:'none'
	}
	
	return (
	<div>
		<div style={hdnModal} id="hdnModal">
		  
		 <input type="button" className="btn btn-primary" value="test"/>
				<div className="form-group">
			    <label for="exampleInputEmail1">Email address</label>
			    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
			    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
			  </div>
			  <div className="form-group">
			    <label for="exampleInputPassword1">Password</label>
			    <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password"/>
			  </div>
			  <div className="form-group">
			    <label for="exampleSelect1">Example select</label>
			    <select className="form-control" id="exampleSelect1">
			      <option>1</option>
			      <option>2</option>
			      <option>3</option>
			      <option>4</option>
			      <option>5</option>
			    </select>
			  </div>
			  <div className="form-group">
			    <label for="exampleSelect2">Example multiple select</label>
			    <select multiple class="form-control" id="exampleSelect2">
			      <option>1</option>
			      <option>2</option>
			      <option>3</option>
			      <option>4</option>
			      <option>5</option>
			    </select>
			  </div>
			  <div class="form-group">
			    <label for="exampleTextarea">Example textarea</label>
			    <textarea className="form-control" id="exampleTextarea" rows="3"></textarea>
			  </div>
			  <div class="form-group">
			    <label for="exampleInputFile">File input</label>
			    <input type="file" className="form-control-file" id="exampleInputFile" aria-describedby="fileHelp"/>
			    <small id="fileHelp" className="form-text text-muted">This is some placeholder block-level help text for the above input. It's a bit lighter and easily wraps to a new line.</small>
			  </div>
			  <fieldset class="form-group">
			    <legend>Radio buttons</legend>
			    <div class="form-check">
			      <label class="form-check-label">
			        <input type="radio" className="form-check-input" name="optionsRadios" id="optionsRadios1" value="option1" checked/>
			        Option one is this and that&mdash;be sure to include why it's great
			      </label>
			    </div>
			    <div className="form-check">
			    <label className="form-check-label">
			        <input type="radio" className="form-check-input" name="optionsRadios" id="optionsRadios2" value="option2"/>
			        Option two can be something else and selecting it will deselect option one
			      </label>
			    </div>
			    <div className="form-check disabled">
			    <label className="form-check-label">
			        <input type="radio" className="form-check-input" name="optionsRadios" id="optionsRadios3" value="option3" disabled/>
			        Option three is disabled
			      </label>
			    </div>
			  </fieldset>
			  <div class="form-check">
			    <label class="form-check-label">
			      <input type="checkbox" className="form-check-input"/>
			      Check me out
			    </label>
			  </div>
		
		
       </div>
	   <button type="button" onClick={this.handleCreateClick} className="btn btn-right">Edit</button>
	</div>);

	}
});





var RegistryApplication = React.createClass({
	

	
	render: function() {
	return <div>
	<RegistryEntryFilter/><RegistryScopeList createRegistryClicked={this.loadCreateForm} data={this.props.data}/></div>

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
				<div><CreateModal scope=''/></div>
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
		
		 <input type="button" className="btn btn-primary" value="test"/>
				<div className="form-group">
			    <label for="exampleInputEmail1">Email address</label>
			    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
			    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
			  </div>
			  <div className="form-group">
			    <label for="exampleInputPassword1">Password</label>
			    <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password"/>
			  </div>
			  <div className="form-group">
			    <label for="exampleSelect1">Example select</label>
			    <select className="form-control" id="exampleSelect1">
			      <option>1</option>
			      <option>2</option>
			      <option>3</option>
			      <option>4</option>
			      <option>5</option>
			    </select>
			  </div>
			  <div className="form-group">
			    <label for="exampleSelect2">Example multiple select</label>
			    <select multiple class="form-control" id="exampleSelect2">
			      <option>1</option>
			      <option>2</option>
			      <option>3</option>
			      <option>4</option>
			      <option>5</option>
			    </select>
			  </div>
			  <div class="form-group">
			    <label for="exampleTextarea">Example textarea</label>
			    <textarea className="form-control" id="exampleTextarea" rows="3"></textarea>
			  </div>
			  <div class="form-group">
			    <label for="exampleInputFile">File input</label>
			    <input type="file" className="form-control-file" id="exampleInputFile" aria-describedby="fileHelp"/>
			    <small id="fileHelp" className="form-text text-muted">This is some placeholder block-level help text for the above input. It's a bit lighter and easily wraps to a new line.</small>
			  </div>
			  <fieldset class="form-group">
			    <legend>Radio buttons</legend>
			    <div class="form-check">
			      <label class="form-check-label">
			        <input type="radio" className="form-check-input" name="optionsRadios" id="optionsRadios1" value="option1" checked/>
			        Option one is this and that&mdash;be sure to include why it's great
			      </label>
			    </div>
			    <div className="form-check">
			    <label className="form-check-label">
			        <input type="radio" className="form-check-input" name="optionsRadios" id="optionsRadios2" value="option2"/>
			        Option two can be something else and selecting it will deselect option one
			      </label>
			    </div>
			    <div className="form-check disabled">
			    <label className="form-check-label">
			        <input type="radio" className="form-check-input" name="optionsRadios" id="optionsRadios3" value="option3" disabled/>
			        Option three is disabled
			      </label>
			    </div>
			  </fieldset>
			  <div class="form-check">
			    <label class="form-check-label">
			      <input type="checkbox" className="form-check-input"/>
			      Check me out
			    </label>
			  </div>
		
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
    <h1>Registry Entry (Read Only)</h1>
    <EditModal />
    </div>
</div>  

  }
});

  
var scopes=convertData(regentries);
ReactDOM.render(
	    <RegistryApplication data={scopes}/>,
	    document.getElementById('registrycontainer')
	  );


  
