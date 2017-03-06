# ExpressScriptsRegistry

User Guide:

Express Scripts Registry Usage Guide
Registry Entries application is for the maintenance of Registry Entry Configuration data. 
Each entry consists of a Scope, a Name, a value, and a flag on whether the value is confidential. 

1)	Finding Entries (Filter Panel)
a)	Filter Form
i)	Open the filter panel
ii)	Type a filter keyword in one of the filter textboxes.
(1)	You can use regular expression rules: for example: 
(a)	/Scope*
(b)	*Scope1/*
(c)	Etc.
iii)	If you wish to clear all search textboxes, just click the clear button.
iv)	You can select whether to use case sensitivity, and only confidential items.
v)	If you select Use Inheritance, then those scopes which have parent scopes that contain entries that do not exist in the child, will also appear in the search results.
b)	Tree View
i)	Open the filter panel.
ii)	You can expand the tree view to find the scope, subscope, or registry entry you are looking for.
(1)	NOTE: if there are multiple pages of entries, you may need to use the keyword boxes to narrow down the results, or click the next page on the main page in order to see the item in the tree view.
(2)	NOTE: another trick is to increase the maximum items per page, in order to see all items in the list.
iii)	Click the item you wish to view. 
iv)	The item will show up on the right for investigation.
2)	Adding an entry. 
a)	from the tree view.
i)	Open the filter panel by clicking the Filter Panel button.
ii)	Expand the Filter Tree to the scope you wish to add an entry to.
iii)	Right click on the entry, a context menu will pop up.
iv)	Click on Add Entry menu item a dialogue will appear.
(1)	Type in the name 
(2)	Type in the value
(3)	Select if you want confidential.
(4)	Click submit.
b)	from the root of the main page.
i)	On the main page there is an icon for add entry (+) and a dialogue will appear
(1)	Type in a scope
(2)	Type in the name
(3)	Type in the value 
(4)	Click submit.
c)	from within a scope
i)	Expand scope by clicking on a scope name in the main page.
ii)	There is an add entry icon (+) click it and a dialogue box will pop up.
(1)	Type in a name
(2)	Type in a value
(3)	Click Submit.
d)	using Drag n Drop
i)	Expand a scope 
ii)	Drag an entry into the panel of another scope
(1)	A dialogue will come up asking what action to take.
(a)	You can click copy entry
(b)	You can click move entry.
3)	Copy a Scope
a)	Copy Scope using Filter Tree
i)	Open the filter Panel by clicking on the filter panel button.
ii)	Right click on the scope you wish to copy.
iii)	A Context menu will appear.
iv)	Select copy scope menu item.
(1)	In the copy scope dialogue box
(a)	Type a new scope name.
(b)	Click on submit.
(c)	NOTE: Subscopes under this scope are not copied, only entries within the current scope.
b)	Copy Scope using Main Panel
i)	In the main page click on the “Copy Scope” icon located on the right of a scope panel.
(1)	In the dialogue box type the new scope name and click submit.
(a)	NOTE: subscopes under this scope are not copied. Only entries within the current scope.
4)	Delete a Scope
a)	Using the Tree View
i)	Right click a scope and click delete scope in the context menu
(1)	If the selected scope has no subscopes, then a standard delete is performed.
(2)	Cascade Delete – If there are child scopes then all subscope entries will be deleted in addition to selected scope.
(3)	Restrictive Delete – there are child scopes then they will not be deleted and will be orphaned after the selected scope is deleted.
b)	Using the main panel
i)	Click the delete scope icon next to a scope panel you wish to delete (x)
(1)	If the selected scope has no subscopes, then a standard delete is performed.
(2)	Cascade Delete – If there are child scopes then all subscope entries will be deleted in addition to selected scope.
(3)	Restrictive Delete – there are child scopes then they will not be deleted and will be orphaned after the selected scope is deleted.

5)	Edit an Entry
a)	Using the Tree View
b)	Using the main Panel
6)	Sort all entries within a scope
