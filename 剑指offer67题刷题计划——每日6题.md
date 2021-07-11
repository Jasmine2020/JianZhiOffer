## 剑指offer67题刷题计划——每日6题

#### 第一天（2021-7-11）

##### No.1 [二维数组中的查找](https://www.nowcoder.com/practice/abc3fe2ce8e146608e868a70efebf62e?tpId=13&tqId=11154&tPage=1&rp=1&ru=/ta/coding-interviews&qru=/ta/coding-interviews/question-ranking)

> 在一个二维数组中，每一行都按照从左到右递增的顺序排序，每一列都按照从上到下递增的顺序排序。请完成一个函数，输入这样的一个二维数组和一个整数，判断数组中是否含有该整数。

<!--必须从左下角或者右上角开始查找，即当i代表行元素，j代表列元素时，i与j必须一为最大一为最小，方可通过当前位置判断下一个查询的数据方向-->

```c++
bool Find(int target, vector<vector<int> > array) {
  // array.size()为行数，array[0].size()为列数
  int i=0,j=array[0].size()-1;
  while(i<array.size()&&j>=0){
   if(array[i][j]<target){
    	i++;
    }else if(array[i][j]>target){
      j--;
    }else if(array[i][j]==target){
      return true;
    } 
  }
  return false;
}
// 复杂度 O(2n)
```

```c++
bool Find(int target, vector<vector<int> > array) {
  for(int i=0;i<array.size();i++){
    auto list=array[i];
    int left=0,right=list.size()-1;
    while(left<=right){
      int mid=(left+right)/2;
      if(list[mid]==target){
        return true;
      }else if(list[mid]<target){
        left=mid+1;
      }else{
        right=mid-1;
      }
    }
  }
  return false;
}
// 复杂度 O(nlogn) 逐行二分
```

##### No.2 [替换空格](https://www.nowcoder.com/practice/4060ac7e3e404ad1a894ef3e17650423?tpId=13&tqId=11155&tPage=1&rp=1&ru=/ta/coding-interviews&qru=/ta/coding-interviews/question-ranking)

> 请实现一个函数，将一个字符串中的每个空格替换成“%20”。例如，当字符串为We Are Happy.则经过替换之后的字符串为We%20Are%20Happy。

<!--因为一个空格要被替换为三个字符，因此需要计算空格的个数重新动态分配需要的空间-->

```c++
string replaceSpace(string s) {
  int i=0,j;
  int length=s.size();
  int count=0;
  cout<<length<<endl;
  for(i;i<length;i++){
    if(s[i]==' '){
      count+=1;
    }
  }
  char* p=NULL;
  p=(char*)malloc(length+count*2);
  i=j=0;
  while(i<length){
    if(s[i]==' '){
      p[j++]='%';
      p[j++]='2';
      p[j++]='0';
      i++;
    }else{
      p[j++]=s[i++];
    }
  }
  return p;
}
```

```c++
string replaceSpace(string s) {
   int i=0,length=s.size();
   string p="";
   for(i;i<length;i++){
      if(s[i]!=' '){
        p+=s[i];
      }else{
        p+="%20";
      }
   }
   return p;
}
// c++中字符串双引号，字符单引号
```

##### No.3 [从尾到头打印链表](https://www.nowcoder.com/practice/d0267f7f55b3412ba93bd35cfa8e8035?tpId=13&tqId=11156&tPage=1&rp=1&ru=/ta/coding-interviews&qru=/ta/coding-interviews/question-ranking)

> 输入一个链表，从尾到头打印链表每个节点的值。

```c++
class Solution {
public:
    vector<int> printListFromTailToHead(ListNode* head) {
        vector<int> res;
        if(head==NULL) return res;
        res=printListFromTailToHead(head->next);
        res.push_back(head->val);
        return res;
    }
};
// 递归后插入法
```

```c++
class Solution {
public:
    vector<int> printListFromTailToHead(ListNode* head) {
        stack<int> temp;
        ListNode *ptr=head;
        while(ptr!=NULL){
            temp.push(ptr->val);
            ptr=ptr->next;
        }
        vector<int> res;
        while(!temp.empty()){
            res.push_back(temp.top());
            temp.pop();
        }
        return res;
    }
};
// 逆序输出，利用栈来暂存数据，先进后出得到结果
```

##### No.4 [重建二叉树](https://www.nowcoder.com/practice/8a19cbe657394eeaac2f6ea9b0f6fcf6?tpId=13&tqId=11157&rp=1&ru=/ta/coding-interviews&qru=/ta/coding-interviews/question-ranking)

> 输入某二叉树的前序遍历和中序遍历的结果，请重建出该二叉树。假设输入的前序遍历和中序遍历的结果中都不含重复的数字。例如输入前序遍历序列`{1,2,4,7,3,5,6,8}`和中序遍历序列`{4,7,2,1,5,3,8,6}`，则重建二叉树并返回。

<!--前序遍历：根 -> 左 -> 右，中序遍历：左 -> 根 -> 右。-->

<!--因此一颗二叉树中，前序遍历的第一个结点为根结点，通过它在中序遍历中的位置，可以将中序遍历分为两部分，左半部分是该结点的左子树，右半部分是该结点的右子树。-->

<!--利用递归就可以构建二叉树-->

![TwoBinaryTree](TwoBinaryTree.png)

```c++
/**
 * Definition for binary tree
 * struct TreeNode {
 *     int val;
 *     TreeNode *left;
 *     TreeNode *right;
 *     TreeNode(int x) : val(x), left(NULL), right(NULL) {}
 * };
 */
class Solution {
public:
    TreeNode* reConstructBinaryTree(vector<int> pre,vector<int> vin) {
        if(pre.size()==0&&vin.size()==0){
            return NULL;
        }
        TreeNode* root = new TreeNode(pre[0]);
        int i;
        for(i;i<vin.size();i++){
            if(vin[i]==pre[0]){
                break;
            }
        }
        vector<int> pre_l(pre.begin()+1,pre.begin()+i+1);
        vector<int> pre_r(pre.begin()+i+1,pre.end());
        vector<int> vin_l(vin.begin(),vin.begin()+i);
        vector<int> vin_r(vin.begin()+i+1,vin.end());
        root->left=reConstructBinaryTree(pre_l,vin_l);
        root->right=reConstructBinaryTree(pre_r,vin_r);
        return root;
    }
};
```

##### No.5 [用两个栈实现队列](<https://www.nowcoder.com/practice/54275ddae22f475981afa2244dd448c6?tpId=13&tqId=11158&rp=1&ru=/ta/coding-interviews&qru=/ta/coding-interviews/question-ranking>)

> 用两个栈来实现一个队列，分别完成在队列尾部插入整数(push)和在队列头部删除整数(pop)的功能。 队列中的元素为int类型。保证操作合法，即保证pop操作时队列内已有元素。

<!--stack1用来记录数据插入的顺序，在需要pop的时候利用stack2来进行数据的逆序从而达到先进先出。-->

<!--但要注意在插入数据时，先将stack2中剩余的元素插入回stack1以保证数据队尾插入的属性。-->

```c++
#include<iostream>
#include<stdio.h>
#include<stack>
using namespace std;

class Solution
{
public:
    void push(int node) {
        while(!stack2.empty()){
            stack1.push(stack2.top());
            stack2.pop();
        }
        stack1.push(node);
    }

    int pop() {
        while(!stack1.empty()){
            stack2.push(stack1.top());
            stack1.pop();
        }
        int res=stack2.top();
        stack2.pop();
        return res;
    }

private:
    stack<int> stack1;
    stack<int> stack2;
};
int main()
{
    Solution s= *new Solution();
    s.push(3);
    s.push(5);
    cout<<s.pop()<<endl;
    s.push(1);
    s.push(4);
  	cout<<s.pop()<<endl;
    cout<<s.pop()<<endl;
    cout<<s.pop()<<endl;
    return 0;
}
```

##### No.6 [旋转数组的最小数字](<https://www.nowcoder.com/practice/9f3231a991af4f55b95579b44b7a01ba?tpId=13&tqId=11159&rp=1&ru=/ta/coding-interviews&qru=/ta/coding-interviews/question-ranking>)

> 把一个数组最开始的若干个元素搬到数组的末尾，我们称之为数组的旋转。
> 输入一个非递减排序的数组的一个旋转，输出旋转数组的最小元素。
> NOTE：给出的所有元素都大于0，若数组大小为0，请返回0。

<!--二分查找的变种，因为没有target用来做比较，所以用中间值和左右端点进行比较，判断mid在旋转数组的前半段还是后半段。-->

<!--如果mid处于旋转数组的前半段，left=mid+1；-->

<!--如果mid处于旋转数组的后半段，right=mid（可能mid就是最小值，避免错过）-->

<!--其他情况，left++缩小范围-->

![JZ6](./JZ6-1.png)

<!--特殊情况-->

![JZ6](./JZ6-2.png)

```c++
class Solution {
public:
    int minNumberInRotateArray(vector<int> rotateArray) {
        if(rotateArray.size()==0){
            return 0;
        }
        int left=0,right=rotateArray.size()-1;
        while(left<right){
            if(rotateArray[left]<rotateArray[right]){
                return rotateArray[left];
            }
            int mid=(left+right)/2;
            if(rotateArray[mid]>rotateArray[left]){
                left=mid+1;
            }else if(rotateArray[mid]<rotateArray[right]){
                right=mid;
            }else{
                left++;
            }
        }
        return rotateArray[left];
    }
};
```

