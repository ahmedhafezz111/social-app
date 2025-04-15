import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Component, inject, input, Input, InputSignal, OnInit } from '@angular/core';
import { CommentsService } from '../../../core/services/comments/comments.service';
import { IComment } from '../../../core/interfaces/icomment';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-comments',
  imports: [DatePipe,ReactiveFormsModule],
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.css'
})
export class CommentsComponent implements OnInit {

  postId:InputSignal<any> = input.required()
  // @Input({required:true}) postId !:string


  commentGroup!:FormGroup

  commentsData:IComment[] = []
  private readonly commentsService = inject(CommentsService)



  getCommentsData():void{
    this.commentsService.getPostsComment(this.postId()).subscribe({
      next:(res)=>{
        console.log(res.comments);
        this.commentsData = res.comments
        
      },error:(err)=>{
        console.log(err);
        
      }
    })
  }

  sendComment():void{
    this.commentsService.createComment(this.commentGroup.value).subscribe({
      next:(res)=>{
        this.commentsData = res.comments.reverse()
        this.commentGroup.get('content')?.reset()
        console.log(res);
        
      }
    })
  }

  ngOnInit(): void {
    this.commentGroup = new FormGroup({
      content:new FormControl(null),
      post:new FormControl(this.postId()),
    })
     this.getCommentsData()
  }
}
