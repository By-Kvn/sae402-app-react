<?php

class ItemManager{
	
    private $databaseConnection  = NULL;
    private $itemsTable  = '';

	function __construct($databaseConnection, $itemsTable)
	{
		$this->databaseConnection = $databaseConnection;
        $this->itemsTable = $itemsTable;
	}

    public function addItemToDb($name, $description){		
		
        $stmt = $this->databaseConnection->prepare("
		INSERT INTO ".$this->itemsTable."(`name`, `description`)
		VALUES(?,?)");
	
        $stmt->bind_param("ss", $name, $description);
        
        if($stmt->execute()){
            return true;
        }
    
        return false;		 
    } 
    
    public function modifyItemToDb($id, $name, $description)
    {
        //to implement ---> modification item	
    }
    
    public function removeItemToDb($id)
    {
        //to implement ---> suppression item	
    }	

    
}
?>