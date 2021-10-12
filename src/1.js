var maxValue = function(grid) {
    var m=grid.length-1
    var n=grid[0].length-1
    var i=j=0
    var ans=grid[0][0]
    while(i!=m||j!=n){
        if(i==m&&j!=n){
            j++
            ans+=grid[i][j]
        }

        if(i!=m&&j==n){
            i++
            ans+=grid[i][j]
        }
        if(i!=m&&j!=n){
            if(grid[i+1][j]>grid[i][j+1]){
                i++
                ans+=grid[i][j]
            }else{
                j++
                ans+=grid[i][j]
            }
        }

    }
   
    
    return ans
};
maxValue([[1,2,5],[3,2,1]])