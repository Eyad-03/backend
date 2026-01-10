import Category from '../models/categories.Model.js'

export const createCategory = async (req,res)=>
{

const {name,description} =req.body 

try
{

    if(!name)
    {
        return res.status(400).json({message:"name is require"})
    }

const newCategory = await Category.create({name,description})

return res.status(201).json({newCategory})

}

catch(error)
{
    return res.status(500).json({message:"error create category"})
}



}

export const getCategory = async(req,res)=>
{

try
{
    const categories = await Category.find()

    if(categories.length === 0)
    {
        return res.status(404).json({message:"category not found"})
    }

    return res.status(201).json({categories})
}


catch(error)
{
    return res.status(500).json({message:"error fetching category"})
}

}


// update category
export const updateCategory = async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;

  try {
    const updatedCategory = await Category.findByIdAndUpdate(
      id,
      { name, description },
      { new: true }
    );

    if (!updatedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }

    return res
      .status(200)
      .json({
        updatedCategory,
        message: "Category updated successfully",
      });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating category", error });
  }
};


// delete category
export const deleteCategory = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedCategory = await Category.findByIdAndDelete(id);

    if (!deletedCategory) {
      return res
        .status(404)
        .json({ message: "Category not found" });
    }

    return res
      .status(200)
      .json({ message: "Category deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting category", error });
  }
};
