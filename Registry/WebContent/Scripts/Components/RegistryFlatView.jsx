var RegistryFlatMain= React.createClass({
	
    clickHandler:function(){
    	alert("I've been clicked")
    },
	render:function(){
		var serverUrl = this.props.url;

		return(<div>
		        <b>ServerUrl:</b> {serverUrl}<br />
		        <b>ServerUrl2:</b> {this.props.url}<br />
				<RegistryListFlatView onclick={this.clickHandler} someproperty="blah">
				    <h2>hello I'm a chile</h2>
				</RegistryListFlatView>
						
			</div>);
	}
});



var RegistryListFlatView= React.createClass({
    handleClick:function(){
    	this.setState({valid:"hello I'm Not Valid"},function(){alert('hello')});
    	this.props.onclick();
    },
	getInitialState: function() { 
        return {valid:"hello I'm valid"}; 
        
    }, 
render:function(){
	return(<div>
	<span>{this.state.valid}</span>
	<button onClick={this.handleClick}>click me</button>
	{this.props.children}
	</div>);
}
});

