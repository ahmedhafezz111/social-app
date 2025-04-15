import { Component, inject, OnInit } from '@angular/core';
import { PostsService } from '../../core/services/posts/posts.service';
import { IPosts } from '../../core/interfaces/iposts';
import { DatePipe } from '@angular/common';
import { CommentsComponent } from "../../shared/ui/comments/comments.component";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-timeline',
  imports: [DatePipe, CommentsComponent,FormsModule],
  templateUrl: './timeline.component.html',
  styleUrl: './timeline.component.css'
})
export class TimelineComponent implements OnInit{

  postsData:IPosts[] =[]
  savedFile!:File
  content:string = ""

  private readonly postsService = inject(PostsService)

getPostsData():void{
  this.postsService.getAllPosts().subscribe({
    next:(res)=>{
      console.log(res);
      this.postsData=res.posts
      
    },error:(err)=>{
      console.log(err);
      
    }
  })
}

changeImg(e:Event):void{
  const input = e.target as HTMLInputElement
  if(input.files && input.files.length > 0){
   this.savedFile = input.files[0]
  //  console.log(this.savedFile.name);
  

   
   

  }
  
}

addPost():void{
const formData = new FormData()
formData.append('body' , this.content)
formData.append('image',this.savedFile)
this.postsService.createPost(formData).subscribe({
  next:(res)=>{
    console.log(res);
    this.getPostsData()
    
  }
})
}

  ngOnInit(): void {
    this.getPostsData()
  }


}
