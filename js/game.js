(function(){
    var images = [];
    
    var imgID = 0;
    
    var flippedCards = [];
    
    var modalGameOver = document.querySelector("#modalGameOver");
    
    var matches = 0;

    var attempts = 0;

    var saida = document.getElementById("saida");

    //função que pega as imagens
    for(var i = 0; i < 36; i++){
            if(i>1 && i%2 === 0){
                imgID++;
            }
            var img = {
            src: "img/img (" + i + ").jpg",
            id: imgID
        };
        images.push(img);
    }
    
    startGame();
    
    function startGame(){
        matches = 0;
        
        attempts = 0;

        images=randomSort(images);
        
        var frontFaces = document.getElementsByClassName("front");
        var backFaces = document.getElementsByClassName("back");
        
        for(var i = 0; i < 36; i++){
            frontFaces[i].classList.remove("flipped", "match")
            backFaces[i].classList.remove("flipped", "match")
            //faz a rotação da carta
             var card = document.querySelector("#carta" + i);
            card.addEventListener("click",flipCard,false);
            //coloca imagens na face frontal da carta
            frontFaces[i].style.background = "url('"+images[i].src+"')";
            frontFaces[i].setAttribute("id",images[i].id);
        }
        modalGameOver.style.zIndex = -2;
        modalGameOver.style.opacity = 0;
        modalGameOver.removeEventListener("click", startGame, false);
    }
    
    function randomSort(oldArray){
        
        //coloca as imagens aleatorio
        var newArray = [];
        
        //cria a mesma quantidade de arrays da old na new
        while(newArray.length !== oldArray.length){
            var i = Math.floor(Math.random() * oldArray.length);
            
            //testa pra ver se a array ja não existe
            if(newArray.indexOf(oldArray[i])< 0){
                newArray.push(oldArray[i]);
            }
        }
        return newArray;
    }
    function flipCard(){
       if(flippedCards.length < 2){
            var faces = this.getElementsByClassName("face");
            if(faces[0].classList.length > 2){
                return;
            }
            faces[0].classList.toggle("flipped");
            faces[1].classList.toggle("flipped");
            flippedCards.push(this);
            //Verificação do par
            if(flippedCards.length === 2){
                if(flippedCards[0].childNodes[3].id === flippedCards[1].childNodes[3].id){
                flippedCards[0].childNodes[1].classList.toggle("match");
                flippedCards[0].childNodes[3].classList.toggle("match");
                flippedCards[1].childNodes[1].classList.toggle("match");
                flippedCards[1].childNodes[3].classList.toggle("match"); 

                matches++;

                flippedCards = [];
                //caso todas estiverem abertas aparecera a function gameOver
                if (matches === 18) {
                    gameOver();
                }              
                }
            }
        }
       else{
            flippedCards[0].childNodes[1].classList.toggle("flipped");
            flippedCards[0].childNodes[3].classList.toggle("flipped");
            flippedCards[1].childNodes[1].classList.toggle("flipped");
            flippedCards[1].childNodes[3].classList.toggle("flipped");
            attempts++
            //mostrar total de tentativas
            var msg = "Tentativas: " + attempts;
            saida.innerHTML = msg;
            flippedCards = [];
        }
   }    
   
   function gameOver(){
       modalGameOver.style.zIndex = 1;
       modalGameOver.style.opacity = 1;
       modalGameOver.addEventListener("click",startGame,false);
   }}());