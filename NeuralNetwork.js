class NeuralNetwork{
  /*
    @param {parent} NeuralNetwork instance that is passed to do a copy
  */
  constructor(parent,number_of_input,number_of_hidden,number_of_output){
    
    /* Checks if it's making a copy,
    otherwise create a new one*/
    if(parent instanceof NeuralNetwork){

      this.number_of_input = parent.number_of_input;
      this.number_of_hidden = parent.number_of_hidden;
      this.number_of_output = parent.number_of_output;
      
      this.input_to_hidden_weights = parent.input_to_hidden_weights.copy();
      
      this.hidden_to_output_weights = parent.hidden_to_output_weights.copy();
      
      this.hidden_biases = parent.hidden_biases.copy();
      
      this.output_biases = parent.output_biases.copy();
    }
    else{
    /*
      initializing nodes and creating weights and biases
    */
      this.number_of_input=number_of_input;
      this.number_of_hidden=number_of_hidden;
      this.number_of_output=number_of_output;
      
      this.input_to_hidden_weights=new Matrix(number_of_input,number_of_hidden);
      
      this.hidden_to_output_weights=new Matrix(number_of_hidden,number_of_output);
      
     this.hidden_biases=new Matrix(number_of_hidden,1);
     
     this.output_biases=new Matrix(number_of_output,1);
     /* Giving weights and biases random value */
     this.input_to_hidden_weights.randomize();
     this.hidden_to_output_weights.randomize();
     this.hidden_biases.randomize();
     this.output_biases.randomize();
    }
  }
  /* @@param {inputs} Array of inputs to be feed in to the NeuralNetwork
  */
  gues(inputs){
    /*
      This is the whole feed forward algorithm. 
    */
    /* Multiplying the matrix of the weights and inputs */
    var weighted_input=Matrix.multiply(this.input_to_hidden_weights,inputs);
    
  /* 
    Adding the all the product of the weights matrix and inputs and putting it to one matrix. (Summation of the weighted inputs).
  */
  
    var sum_of_weighted_inputs=Matrix.getWeightedSum(weighted_input);
    
   /* Adding the input biases to the Summation of weighted inputs */
  
    var sum_of_weighted_inputs_and_bias=Matrix.add(sum_of_weighted_inputs,this.hidden_biases);
  /* 
    passing to the sigmoid activation function to determine the final results.
  */
    var sigmoid_of_weighted_inputs_and_bias=sigmoidActivation(sum_of_weighted_inputs_and_bias);
  
  /* 
    Multiplying the matrix of the final result of the input to hidden to the weights of hidden to output synapses.
  */
    var weighted_hidden_values=Matrix.multiply(this.hidden_to_output_weights,sigmoid_of_weighted_inputs_and_bias);
  
    /* Getting the sum */
    var sum_of_weighted_hidden_values=Matrix.getWeightedSum(weighted_hidden_values);
  
  /* Adding the output bias to get the final result */
    var output=Matrix.add(sum_of_weighted_hidden_values,this.output_biases);
    
    /* 
      Passing the final output to the activation function and reurn it.
    */
    return sigmoidActivation(output);
  }
  mutate(rate){
   /* 
    Algorithm for mutation. 
   */
    function mut(value_to_mutate){
      
      if(Math.random()<rate){
        /*
          Giving a random mutation based on rate.
        */
        
        return Math.random()*2-1;
      }else{
        return value_to_mutate;
      }
    }
    /*
      Mapping the weights and biases to the mutate function (mut) to do a mutation.
    */
    this.input_to_hidden_weights.map(mut);
    this.hidden_to_output_weights.map(mut);
    this.hidden_biases.map(mut);
    this.output_biases.map(mut);
  }
  copy(){
    /*
      Method for copying this NeuralNetawork
    */
    // return this instance of NeuralNetwork
    return new NeuralNetwork(this);
  }
}

/*/**
 * This is the matrix class. It is user for storing the weights and biases and perform ooerations.
 */
class Matrix{
  
  constructor(rows,columns){
    this.rows=rows;
    this.columns=columns;
    
    this.array=[];
    
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.columns; j++) {
        this.array[i]=[];
      }
    }
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.columns; j++) {
        this.array[i][j]=0;
      }
    }
  }
  randomize(){
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.columns; j++) {
        this.array[i][j]=Math.random()*2-1;
      }
    }
  }
  copy(){
    let to_copy=new Matrix(this.rows,this.columns)
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.columns; j++) {
        to_copy.array[i][j]=this.array[i][j];
      }
    }
    return to_copy;
  }
  static add(weighted_sum,bias){
    var result=[];
    for(let i=0;i<weighted_sum.length;i++){
     var val=weighted_sum[i]+bias.array[i][0];
      result.push(val);
    }
    return result;
  }
  static multiply(matrix,vector){
    let a=matrix;
    let b=vector;
    let result=new Matrix(a.columns,a.rows);
    for(let i=0;i<result.rows;i++){
      for(let j=0;j<result.columns;j++){
        result.array[i][j]=a.array[j][i]*b[j];
      }
    }
    
   return result;
  }
  static getWeightedSum(matrix_product){
    let result=[];
    
    for (let i = 0; i < matrix_product.rows; i++){
      var sum=0;
     for (let j = 0; j < matrix_product.columns; j++){
       sum+=matrix_product.array[i][j];
     }
     result.push(sum);
   }
  return result;
  }
  map(func){
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.columns; j++) {
        var value_to_map=this.array[i][j];
        this.array[i][j]=func(value_to_map);
      }
    }
  }
}
  function sigmoidActivation(arr) {
    var result = [];
    for (let i = 0; i < arr.length; i++) {
      var arry_value = arr[i];
      result.push(sigmoidFunction(arry_value));
    }
    return result;
  }
  function sigmoidFunction(value) {
    return 1 / (1 + Math.exp(-value));
  }
  