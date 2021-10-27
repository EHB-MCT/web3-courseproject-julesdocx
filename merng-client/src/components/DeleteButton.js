import { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { Button, Confirm, Icon } from "semantic-ui-react";
import { FETCH_POSTS_QUERY } from '../utils/graphql'


function DeleteButton({commentId, postId, callback}) { // props = { postId, commentId, callback() }
    const [confirmOpen, setConfirmOpen] = useState(false);

    const mutation = commentId ? DELETE_COMMENT_MUTATION : DELETE_POST_MUTATION;
    console.log(commentId, postId, callback)
    const [deleteSubject] = useMutation(mutation, {
        variables: { 
            postId, 
            commentId
        },
        update(proxy) {
            setConfirmOpen(false);
            if(!commentId) {
                console.log('wow')
                const data = proxy.readQuery({
                    query: FETCH_POSTS_QUERY,
                });
                proxy.writeQuery({ 
                    query: FETCH_POSTS_QUERY, 
                    data: {
                        getPosts: [...data.getPosts.filter(p => p.id !== postId)]
                    }
                });
            }
            if(callback) callback();
        }
    })

    return (
        <>
        <Button floated="right" color="red" onClick={() => setConfirmOpen(true)}>
            <Icon style={{margin: 0}} name="trash"></Icon>
          </Button>
          <Confirm 
            open={confirmOpen}
            onCancel={() => setConfirmOpen(false)}
            onConfirm={deleteSubject}
            />
        </>
    )
}

const DELETE_POST_MUTATION = gql`
    mutation deletePost($postId: ID!) {
        deletePost(postId: $postId)
    }
`

const DELETE_COMMENT_MUTATION = gql`
    mutation deleteComment($postId: ID!, $commentId: ID!) {
        deleteComment(postId: $postId, commentId: $commentId){
            id
            comments {
                id
                username
                createdAt
                body
            }
            commentCount
        }
    }
`
export default DeleteButton;
