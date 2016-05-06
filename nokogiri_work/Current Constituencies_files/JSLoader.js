/// <summary>
///  Dynamic JavaScript loader library, which loads defined scripts and their 
///  dependencies dynamically, based on various defined conditions. Common use for this
///  library is when a library script is required as a dependency (i.e. jQuery), but 
///  it first needs to be determined whether jQuery definition already exists within the
///  content of the page (i.e. defined by specific application). This allows the script
///  to be loaded if certain conditions apply (i.e. jQuery not already included within the application).
/// </summary>
/// <history>
///   <change date="2015-08-21" author="Konrad Kyc" organization="House of Commons">Created.</change>
/// </history>
	
 // Define namespaces
 var Parl = {};
 Parl.Web = {};
 Parl.Web.JSLoader = {};
 
 /*
 
 Script Definition Format Example
  
	 var scriptDefinitions = [
		 { 
			scriptId: 'jQuery v2.0.3',
			path: 'https://ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min.js',
			dependencies: [],
			loadAsDependencyOnly: true,
			loadWhenDependencyIsReady: false,
			containerElement: 'head',
			isLoadedCheck: function() { return !(typeof jQuery == 'undefined'); },
			loadCondition: null
		 },
		 { 
			scriptId: 'wet-boew',
			path: '/Common/Parl/Sharebar/js/wet-boew.min.js',
			dependencies: ['jQuery v2.0.3'],
			loadAsDependencyOnly: false,
			loadWhenDependencyIsReady: true,
			containerElement: 'body',
			isLoadedCheck: null,
			loadCondition: function() { return !(isIE && lteIE9); }
		 },			 
		 { 
			scriptId: 'ie8-wet-boew',
			path: '/Common/Parl/Sharebar/js/ie8-wet-boew.min.js',
			dependencies: ['jQuery v2.0.3'],
			loadAsDependencyOnly: false,
			loadWhenDependencyIsReady: true,
			containerElement: 'body',
			isLoadedCheck: null,
			loadCondition: function() { return (isIE && lteIE9); }
		 }
	 ];
*/

 /// <summary>
 ///  Loads scripts and their depndencies based on the given script definition object.
 ///  An example of the script definition object can be found above.
 /// </summary>
 /// <param name="path">The path of the script (can be relative).</param>
 Parl.Web.JSLoader.LoadScripts = function(scriptDefinitions){
	var dependenciesToLoad = {};
	
	// Load Dependencies
	for(var i=0; i < scriptDefinitions.length; i++){
		var scriptDefinition = scriptDefinitions[i];
		
		// Determine already loaded scripts
		if(scriptDefinition.isLoadedCheck != 'undefined' && scriptDefinition.isLoadedCheck != null){
			scriptDefinition.isLoaded = scriptDefinition.isLoadedCheck();
		} else {
			scriptDefinition.isLoaded = false;
		}
		
		if(!scriptDefinition.loadAsDependencyOnly && (scriptDefinition.loadCondition == null || (scriptDefinition.loadCondition != null && scriptDefinition.loadCondition()))) {
			// Loop through the dependencies of the current definitions
			for(var j=0; j < scriptDefinition.dependencies.length; j++){
				var scriptDependency = scriptDefinition.dependencies[j];
				
				// Create the dependency reference object if it doesn't exist
				if(!dependenciesToLoad[scriptDependency]){
					dependenciesToLoad[scriptDependency] = {};
				}
							
				// Create the scripts array if they don't exists.
				if(!dependenciesToLoad[scriptDependency].dependentScripts){
					dependenciesToLoad[scriptDependency].dependentScripts = [];
				}
				
				// Add the current script definition, to the list of dependant scripts
				dependenciesToLoad[scriptDependency].dependentScripts.push(scriptDefinition);
			}
		} 
	}
	
	// Traverse through the "dependencies to load" sub-set, and add the reference objects to them (where applicable)
	for(var i=0; i < scriptDefinitions.length; i++){
		var scriptDefinition = scriptDefinitions[i];
		
		// Check whether the current script definition exists within the "dependencies to load" collection.
		if (dependenciesToLoad.hasOwnProperty(scriptDefinition.scriptId)) {
			// Create the dependency reference property if it doesn't exist
			if(!dependenciesToLoad[scriptDefinition.scriptId].reference){
				dependenciesToLoad[scriptDefinition.scriptId].reference = scriptDefinition;
			}
		}
	}
	
	// Load the dependency scripts first, and load any dependent scripts that need to load only after the dependency script is loaded into the DOM
	for (var scriptId in dependenciesToLoad) {
		var scriptDefinition = dependenciesToLoad[scriptId];
		
		// Ensure this script is not already loaded
		if(!scriptDefinition.reference.isLoaded) {
			var dependencyScriptsToLoad = [];
			
			// Create an array of the scripts that are to be loaded as soon as the dependency script is ready and loaded within the DOM
			for(var i=0; i < scriptDefinition.dependentScripts.length; i++){
				// Determine whether the dependent script should be loaded only when this dependency is loaded.
				if(!scriptDefinition.dependentScripts[i].isLoaded && scriptDefinition.dependentScripts[i].loadWhenDependencyIsReady) {
					dependencyScriptsToLoad.push(scriptDefinition.dependentScripts[i]);
					scriptDefinition.dependentScripts[i].isLoaded = true;
				}
			}
			
			// Load the Dependency script into the DOM, and once it's ready, load any dependent scripts
			Parl.Web.JSLoader.LoadScript(scriptDefinition.reference.containerElement, scriptDefinition.reference.path, function(postLoadScripts) {
				// Load the dependent scripts after the dependency has fully loaded in the DOM
				for(var i=0; i < postLoadScripts.length; i++) {
					Parl.Web.JSLoader.LoadScript(postLoadScripts[i].containerElement, postLoadScripts[i].path, null, null);
				}
			}, dependencyScriptsToLoad);
			
			// Indicate that the dependency script is loaded
			scriptDefinition.reference.isLoaded = true;
		}
	}
	
	// Traverse through the script definitions, and load any applicable scripts that haven't been loaded.
	for(var i=0; i < scriptDefinitions.length; i++){
		var scriptDefinition = scriptDefinitions[i];
		
		// Determine already loaded scripts
		if(!scriptDefinition.isLoaded && !scriptDefinition.loadAsDependencyOnly) {
			// Check whether the script meets the defined loading criteria.
			if(scriptDefinition.loadCondition != 'undefined' && scriptDefinition.loadCondition != null){
				if(scriptDefinition.loadCondition()){
					// Load the script
					Parl.Web.JSLoader.LoadScript(scriptDefinition.containerElement, scriptDefinition.path, null, null);
				}
			} else {
				// Load the script
				Parl.Web.JSLoader.LoadScript(scriptDefinition.containerElement, scriptDefinition.path, null, null);
			}
		}
	}
 };
  
/// <summary>
///  Loads the given script into the DOM, within the specified tag element. Once the script is loaded
///  and ready within the DOM, the callback function is executed (if defined).
/// </summary>
/// <param name="element">The tag name of the element where the script is to be loaded (i.e. head or body).</param>
/// <param name="path">The path of the script (can be relative).</param>
/// <param name="callback">Callback function which is executed when the script is fully loaded and ready within the DOM.</param>
/// <param name="callbackProperties">Any custom properties that are passed as part of the callback function call.</param>
Parl.Web.JSLoader.LoadScript = function(element, path, callback, callbackProperties) {
	var script = document.createElement('script');
	script.src = path;
	
	var head = document.getElementsByTagName(element)[0];
	var done = false;
	
	  // Attach handlers for all browsers
	script.onload = script.onreadystatechange = function() {
		if (!done && (!this.readyState || this.readyState == 'loaded' || this.readyState == 'complete')) {
			done = true;
			
			if(callback != null) {
				callback(callbackProperties);
			}
			script.onload = script.onreadystatechange = null;
		};
	};
	
	head.appendChild(script);
};
