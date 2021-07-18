剑指offer67题刷题计划——每日6题



### 第一天（2021-7-11）

------

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

##### -- No.6 [旋转数组的最小数字](<https://www.nowcoder.com/practice/9f3231a991af4f55b95579b44b7a01ba?tpId=13&tqId=11159&rp=1&ru=/ta/coding-interviews&qru=/ta/coding-interviews/question-ranking>)

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

### 第二天（2021-7-12）

------

##### No.7 [斐波那契数列](https://www.nowcoder.com/practice/c6c7742f5ba7442aada113136ddea0c3?tpId=13&tags=&title=&difficulty=0&judgeStatus=0&rp=1)

> 大家都知道斐波那契数列，现在要求输入一个整数n，请你输出斐波那契数列的第n项（从0开始，第0项为0，第1项是1）。

<!--从第三项开始，第n项的值是前两项的和，标准的递归算法-->

```c++
class Solution {
public:
    int Fibonacci(int n) {
        if(n==0||n==1){
            return n;
        }
        return Fibonacci(n-1)+Fibonacci(n-2);
    }
};
```

##### No.8 [跳台阶](https://www.nowcoder.com/practice/8c82a5b80378478f9484d87d1c5f12a4?tpId=13&tags=&title=&difficulty=0&judgeStatus=0&rp=1)

> 一只青蛙一次可以跳上1级台阶，也可以跳上2级。求该青蛙跳上一个n级的台阶总共有多少种跳法（先后次序不同算不同的结果）。

<!--第一级台阶：1-->

<!--第二级台阶：1+1，0+2-->

<!--第三级台阶：1+2，1+1+1，0+2+1-->

<!--我们可以看出，第n级台阶的跳法可以是第n-1级台阶跳一步或者第n-2级台阶跳两步，即f(n)=f(n-1)+f(n-2)，又是标准的递归算法-->

```c++
class Solution {
public:
    int jumpFloor(int number) {
        if(number==1||number==2){
            return number;
        }
        return jumpFloor(number-1)+jumpFloor(number-2);
    }
};
// 时间复杂度O(2^n)
```

```c++
class Solution {
public:
    vector<int> dp();
    int jumpFloor(int number) {
        if(number==1||number==2){
            return number;
        }
//         这里不用递归，为了避免重复计算记录每次计算完的n-1和n-2的值，在下一次循环中累加
        int n,n1=2,n2=1;
        for(int i=2;i<number;i++){
            n=n1+n2;
            n2=n1;// n-2右移变成n-1的值，便于下次循环累加
            n1=n;// n-1右移变成n的值
        }
        return n;
    }
};
// 时间复杂度O(n)
```

##### No.9 [跳台阶扩展问题](https://www.nowcoder.com/practice/22243d016f6b47f2a6928b4313c85387?tpId=13&tags=&title=&difficulty=0&judgeStatus=0&rp=1)

> 一只青蛙一次可以跳上1级台阶，也可以跳上2级……它也可以跳上n级。求该青蛙跳上一个n级的台阶(n为正整数)总共有多少种跳法。

<!--n=1时: 1-->

<!--n=2时: 1+1, 2-->

<!--n=3时: 2+1, 1+1+1, 1+2, 3-->

<!--n=4时: 2+1+1, 1+1+1+1, 1+2+1, 3+1, 1+1+2, 2+2,  1+3, 4-->

<!--我们可以看出，第n级台阶的跳法可以是第n-1级台阶跳一步或者第n-2级台阶跳两步或者n-3级台阶跳三步……即f(n)=f(0)+f(1)+f(2)+...+f(n-1)=2f(n-1),由此可得递归公式-->

```c++
class Solution {
public:
    int jumpFloorII(int number) {
        if(number<=1){
            return 1;
        }
//         return 2*jumpFloorII(number-1);
//         迭代解法
        int n,n1=1;
        for(int i=2;i<=number;i++){
            n=2*n1;
            n1=n;
        }
        return n;
    }
};
```

```c++
class Solution {
public:
    int jumpFloorII(int number) {
        vector<int> floor(number+1,0);
        floor[0]=floor[1]=1;
        int n=2,i;
        while(n<=number)
        {
            int ret=0;
            for(i=0;i<n;i++)
            {
                ret += floor[i];
            }
            floor[n++]=ret;
        }
        return floor[number];
    }
};
```

##### No.10 [矩阵覆盖](https://www.nowcoder.com/practice/72a5a919508a4251859fb2cfb987a0e6?tpId=13&tags=&title=&difficulty=0&judgeStatus=0&rp=1)

> 我们可以用2\*1的小矩形横着或者竖着去覆盖更大的矩形。请问用n个2\*1的小矩形无重叠地覆盖一个2\*n的大矩形，从同一个方向看总共有多少种不同的方法？

![JZ10-1](JZ10-1.png)

<!--从图中观察我们可以看出，由于大矩形的高为2，因此小矩形竖着放和两个矩形上下放一定能保证竖向无重叠覆盖，因此我们只考虑横向的长n可以怎么组成-->

<!--f(1)=1 f(2)=2 ……  f(n)=f(n-1)+f(n-2)-->

```c++
class Solution {
public:
    int rectCover(int number) {
        if(number<=2){
            return number;
        }
        return rectCover(number-1)+rectCover(number-2);
    }
};
// 递归解法
```

##### -- No.11 [二进制中1的个数](https://www.nowcoder.com/practice/72a5a919508a4251859fb2cfb987a0e6?tpId=13&tags=&title=&difficulty=0&judgeStatus=0&rp=1)

> 输入一个整数，输出该数32位二进制表示中1的个数。其中负数用补码表示。

<!--计算一个数的补数，在规定的位数里，对该数的正数每位取反再加一即得到结果-->

<!--例如在四位二进制数中，-6表示为1010-->

<!--6->0110 按位取反 1001 再加一 1010-->

<!--十进制转换为二进制的方法：除以2取余数并将余数逆序排列-->

```c++
class Solution {
public:
     int  NumberOf1(int n) {
//          stack<int> binary;
         int count=0;
         while(n>0){
//              binary.push(n%2);
             if(n%2==1){
                 count++;
             }
             n=n/2;
         }
//          while(!binary.empty()){
//              cout<<binary.top()<<endl;
//              binary.pop();
//          }
         return count;
     }
};
```

很可惜，这个方法对大部分的结果都是有效的，但是对于`-2147483648`，二进制为`1000...000`，一共有31个0。因为计算机使用补码存储二进制数据的。对于这个数据，我们的方法输出0，实际上为1，所以这种方法是错误的。

```c++
class Solution {
public:
     int  NumberOf1(int n) {
         int count=0;
         while(n!=0){
             count++;
             n=n&(n-1);
         }
         return count;
     }
};
```

&按位与：每次将 n 和 n-1 进行 & 运算，从右往左去掉二进制最右边的一个1。

```val :1101000, val-1: 1100111 那么val & （val-1） : 1100000```

每次与操作结束后n都会少一个1，那么当n为0时，所有1就都被去除完毕了，这样经过了几次循环，就有几个1。

##### No.12 [数值的整数次方](https://www.nowcoder.com/practice/1a834e5e3e1a4b7ba251417554e07c00?tpId=13&tags=&title=&difficulty=0&judgeStatus=0&rp=1)

> 给定一个double类型的浮点数base和int类型的整数exponent。求base的exponent次方。
>
> 保证base和exponent不同时为0。不得使用库函数，同时不需要考虑大数问题，也不用考虑小数点后面0的位数。

<!--由于有公式x^n = (x*x)^n/2，可以利用递归来每次缩小一半的计算量-->

<!--2^4 = 4^2=16^1-->

<!--2^5=2*2^4-->

```c++
class Solution {
public:
    double Power(double base, int exponent) {
        if(exponent==0){
            return 1.0;
        }
        if(exponent==-1){
            return 1.0/base;
        }
        if(exponent%2==0){
            return Power(base*base, exponent/2);
        }
        return base*Power(base, exponent-1);
    }
};
```

```c++
class Solution {
public:
    double Power(double base, int exponent) {
        if(exponent==0)
            return 1.0;
        double ret=Power(base,exponent/2);
        if(exponent%2!=0){
            if(exponent<0)
                ret=ret*ret*(1.0/base);
            else
                ret=ret*ret*base;
        }else{
            ret*=ret;
        }
        return ret;
    }
};
```

### 第三天 （2021-7-13）

------

##### No.13 [调整数组位置使奇数位于偶数前面](https://www.nowcoder.com/practice/ef1f53ef31ca408cada5093c8780f44b?tpId=13&tags=&title=&difficulty=0&judgeStatus=0&rp=1)

> 输入一个整数数组，实现一个函数来调整该数组中数字的顺序，使得所有的奇数位于数组的前半部分，所有的偶数位于数组的后半部分，并保证奇数和奇数，偶数和偶数之间的相对位置不变。

```c++
class Solution {
public:
    vector<int> reOrderArray(vector<int>& array) {
        vector<int> saveEven;
        int slow=0,fast=0;
        while(fast<array.size()){
            if(array[fast]%2==1){
                array[slow]=array[fast];
                slow++;
            }else{
                saveEven.push_back(array[fast]);
            }
            fast++;
        }
        for(int i=0;i<saveEven.size();i++){
            array[slow]=saveEven[i];
            slow++;
        }
        return array;
    }
};
// 时间复杂度：O（N）
// 空间复杂度：O（N)
```

```c++
class Solution {
public:
    vector<int> reOrderArray(vector<int>& array) {
        vector<int> newArray(array.size());
        int slow=0,i=0;
        int fast=array.size()-1,j=array.size()-1;
        while(slow<array.size()&&fast>=0){
            if(array[slow]%2==1){
                newArray[i]=array[slow];
                i++;
            }
            slow++;
            if(array[fast]%2==0){
                newArray[j]=array[fast];
                j--;
            }
            fast--;
        }
        return newArray;
    }
};
```

##### No.14 [链表中倒数最后k个节点](https://www.nowcoder.com/practice/886370fe658f41b498d40fb34ae76ff9?tpId=13&tags=&title=&difficulty=0&judgeStatus=0&rp=1)

> 输入一个链表，输出一个链表，该输出链表包含原链表中从倒数第k个结点至尾节点的全部节点。
>
> 如果该链表长度小于k，请返回一个长度为 0 的链表

<!--快指针先行k步，然后头指针跟快指针同步前进，当快指针达到链表尾部时，头指针所在的节点就是倒数第k个节点-->

<!--如果链表长度比k要小，那么在快指针先行的时候就一定会在某一步指向NULL，直接return空链表即可-->

```c++
/**
 * struct ListNode {
 *	int val;
 *	struct ListNode *next;
 *	ListNode(int x) : val(x), next(nullptr) {}
 * };
 */
class Solution {
public:
    ListNode* FindKthToTail(ListNode* pHead, int k) {
        ListNode *first=pHead;
        for(int i=0;i<k;i++){
            if(first==NULL){
                return NULL;
            }
            first=first->next;
        }
        while(first!=NULL){
            first=first->next;
            pHead=pHead->next;
        }
        return pHead;
    }
};
```

##### No.15 [反转链表](https://www.nowcoder.com/practice/75e878df47f24fdc9dc3e400ec6058ca?tpId=13&tags=&title=&difficulty=0&judgeStatus=0&rp=1)

> 输入一个链表，反转链表后，输出新链表的表头。

```c++
/*
struct ListNode {
	int val;
	struct ListNode *next;
	ListNode(int x) :
			val(x), next(NULL) {
	}
};*/
class Solution {
public:
    ListNode* ReverseList(ListNode* pHead) {
        if(pHead==NULL||pHead->next==NULL){
            return pHead;
        }
        ListNode *head=ReverseList(pHead->next);
        pHead->next->next=pHead;
        pHead->next=NULL;
        return head;
    }
};
// 递归
```

```c++
/*
struct ListNode {
	int val;
	struct ListNode *next;
	ListNode(int x) :
			val(x), next(NULL) {
	}
};*/
class Solution {
public:
    ListNode* ReverseList(ListNode* pHead) {
        if(pHead==NULL||pHead->next==NULL){
            return pHead;
        }
        ListNode *pre,*nex,*curr;
        pre=NULL;
        curr=pHead;
        while(curr!=NULL){
            nex=curr->next;
            curr->next=pre;
            pre=curr;
            curr=nex;
        }
        return pre;
    }
};
// 迭代
```

##### No.16 [合并两个排序的链表](https://www.nowcoder.com/practice/d8b6b4358f774294a89de2a6ac4d9337?tpId=13&tags=&title=&difficulty=0&judgeStatus=0&rp=1)

> 输入两个单调递增的链表，输出两个链表合成后的链表，当然我们需要合成后的链表满足单调不减规则

```c++
/*
struct ListNode {
	int val;
	struct ListNode *next;
	ListNode(int x) :
			val(x), next(NULL) {
	}
};*/
class Solution {
public:
    ListNode* Merge(ListNode* pHead1, ListNode* pHead2) {
        ListNode* fake=new ListNode(-1);
        ListNode* pointer=fake;
        ListNode* p1=pHead1;
        ListNode* p2=pHead2;
        while(p1!=NULL&&p2!=NULL){
            if(p1->val<=p2->val){
                pointer->next=p1;
                p1=p1->next;
            }else{
                pointer->next=p2;
                p2=p2->next;
            }
            pointer=pointer->next;
        }
        if(p1==NULL){
            pointer->next=p2;
        }else{
            pointer->next=p1;
        }
        return fake->next;
    }
};
// 迭代 6ms 536kb
```

```c++
/*
struct ListNode {
	int val;
	struct ListNode *next;
	ListNode(int x) :
			val(x), next(NULL) {
	}
};*/
class Solution {
public:
    ListNode* Merge(ListNode* pHead1, ListNode* pHead2)
    {
        if(pHead1==nullptr)
            return pHead2;
        if(pHead2==nullptr)
            return pHead1;
        ListNode *head;
        if(pHead1->val<=pHead2->val)
        {
            head=pHead1;
            head->next=Merge(pHead1->next,pHead2);
        }
        else{
            head=pHead2;
            head->next=Merge(pHead1,pHead2->next);
        }
        return head;
    }
};
// 递归 3ms 588kb
```

##### No.17 [树的子结构](https://leetcode-cn.com/problems/shu-de-zi-jie-gou-lcof/submissions/)

> 输入两棵二叉树A，B，判断B是不是A的子结构。（ps：我们约定空树不是任意一个树的子结构）

```c++
/**
 * Definition for a binary tree node.
 * struct TreeNode {
 *     int val;
 *     TreeNode *left;
 *     TreeNode *right;
 *     TreeNode(int x) : val(x), left(NULL), right(NULL) {}
 * };
 */

class Solution {
public:
    bool isSubStructure(TreeNode* A, TreeNode* B) {
        if(A==NULL||B==NULL){
            return false;
        }
        return isSubtree(A,B) || isSubStructure(A->left, B) || isSubStructure(A->right,B);
    }

    bool isSubtree(TreeNode* pRoot1, TreeNode* pRoot2){
        if(pRoot1==NULL&&pRoot2==NULL){
            return true;
        }
        if(pRoot1==NULL){
            return false;
        }
        if(pRoot2==NULL){
            return true;
        }
        if(pRoot1->val!=pRoot2->val){
            return false;
        }
        return isSubtree(pRoot1->left,pRoot2->left)&&isSubtree(pRoot1->right,pRoot2->right);
    }
};
```

##### No.18 [二叉树的镜像](https://www.nowcoder.com/practice/a9d0ecbacef9410ca97463e4a5c83be7?tpId=13&tags=&title=&difficulty=0&judgeStatus=0&rp=1)

> 操作给定的二叉树，将其变换为源二叉树的镜像。

![JZ18](JZ18.png)

```c++
/**
 * struct TreeNode {
 *	int val;
 *	struct TreeNode *left;
 *	struct TreeNode *right;
 *	TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
 * };
 */
class Solution {
public:
    TreeNode* Mirror(TreeNode* pRoot) {
        if(pRoot==NULL||pRoot->left==NULL&&pRoot->right==NULL){
            return pRoot;
        }
        TreeNode* l=Mirror(pRoot->left);
        TreeNode* r=Mirror(pRoot->right);
        pRoot->left=r;
        pRoot->right=l;
        return pRoot;
    }
};
```

### 第四天（2021-7-14）

------

##### No.19 [顺时针打印矩阵](https://www.nowcoder.com/practice/9b4c81a02cd34f76be2659fa0d54342a?tpId=13&tags=&title=&difficulty=0&judgeStatus=0&rp=1)

> 输入一个矩阵，按照从外向里以顺时针的顺序依次打印出每一个数字，例如，如果输入如下4 X 4矩阵：
>
> ```
> [[1,2,3,4],
> [5,6,7,8],
> [9,10,11,12],
> [13,14,15,16]]
> ```
>
> 则依次打印出数字
>
> ```[1,2,3,4,8,12,16,15,14,13,9,5,6,7,11,10]```

```c++
class Solution {
public:
    vector<int> printMatrix(vector<vector<int> > matrix) {
        int m=matrix.size();// hang 
        int n=matrix[0].size(); //lie
        int up=0,down=m-1,left=0,right=n-1;
        vector<int> res;
        int x=0,y=0;
        while(up<=down&&left<=right){
            for(y=left;y<=right;y++){
                res.push_back(matrix[up][y]);
            }
            up++;
            for(x=up;x<=down;x++){
                res.push_back(matrix[x][right]);
            }
            right--;
            if(right<left||up>down){
//              针对只有一行或只有一列的特殊情况
                break;
            }
            for(y=right;y>=left;y--){
                res.push_back(matrix[down][y]);
            }
            down--;
            for(x=down;x>=up;x--){
                res.push_back(matrix[x][left]);
            }
            left++;
        }
        return res;
    }
};
```

##### No.20 [包含min函数的栈](https://www.nowcoder.com/practice/4c776177d2c04c2494f2555c9fcc1e49?tpId=13&tags=&title=&difficulty=0&judgeStatus=0&rp=1)

> 定义栈的数据结构，请在该类型中实现一个能够得到栈中所含最小元素的min函数，并且调用 min函数、push函数 及 pop函数 的时间复杂度都是 O(1)
>
> push(value):将value压入栈中
>
> pop():弹出栈顶元素
>
> top():获取栈顶元素
>
> min():获取栈中最小元素

<!--维护两个栈，一个正常存储数据，一个存储当前栈中的最小值，永远保持两个栈的长度一致，同时push，同时pop-->

![JZ20](JZ20.png)

```c++
class Solution {
private:
    stack<int> mins,nums;
public:
    void push(int value) {
        nums.push(value);
        if(mins.empty()){
            mins.push(value);
        }else{
            if(value<mins.top()){
                mins.push(value);
            }else{
                mins.push(mins.top());
            }
        }
    }
    void pop() {
        nums.pop();
        mins.pop();
    }
    int top() {
        return nums.top();
    }
    int min() {
        return mins.top();
    }
};
```

##### No.21 [栈的压入弹出序列](https://www.nowcoder.com/practice/d77d11405cc7470d82554cb392585106?tpId=13&tags=&title=&difficulty=0&judgeStatus=0&rp=1)

> 输入两个整数序列，第一个序列表示栈的压入顺序，请判断第二个序列是否可能为该栈的弹出顺序。假设压入栈的所有数字均不相等。例如序列1,2,3,4,5是某栈的压入顺序，序列4,5,3,2,1是该压栈序列对应的一个弹出序列，但4,3,5,1,2就不可能是该压栈序列的弹出序列。（注意：这两个序列的长度是相等的）

![JZ21](JZ21.png)

```c++
class Solution {
public:
    bool IsPopOrder(vector<int> pushV,vector<int> popV) {
        stack<int> list;
        if(pushV.size()!=popV.size()){
            return false;
        }
        int i=0,j=0;
        while(i<pushV.size()&&j<popV.size()){
            if(list.empty()&&i<pushV.size()){
                list.push(pushV[i]);
                i++;
            }
            while(!list.empty()&&list.top()!=popV[j]){
                list.push(pushV[i]);
                i++;
            }
            while(!list.empty()&&list.top()==popV[j]){
                list.pop();
                j++;
            }
        }
        if(list.empty()){
            return true;
        }else{
            return false;
        }
        
    }
};
// 13ms 508kb
```

```c++
class Solution {
public:
    bool IsPopOrder(vector<int> pushV,vector<int> popV) {
        stack<int> list;
        if(pushV.size()!=popV.size()){
            return false;
        }
        int i,j=0;
        for(i=0;i<pushV.size();i++){
            list.push(pushV[i]);
            while(!list.empty()&&list.top()==popV[j]){
                list.pop();
                j++;
            }
        }
        return list.empty();
    }
};
```

### 第五天（2021-7-15）

------

##### No.22 [从下往上打印二叉树](https://www.nowcoder.com/practice/7fe2212963db4790b57431d9ed259701?tpId=13&tags=&title=&difficulty=0&judgeStatus=0&rp=1)

> 从上往下打印出二叉树的每个节点，同层节点从左至右打印。

广度优先遍历BFS：

1. 初始化：一个队列queue<TreeNode*> q， 将root节点入队列q
2. 如果队列不空，做如下操作：
3. 弹出队列头，保存为node，将node的左右非空孩子加入队列
4. 做2,3步骤，知道队列为空

```c++
/*
struct TreeNode {
	int val;
	struct TreeNode *left;
	struct TreeNode *right;
	TreeNode(int x) :
			val(x), left(NULL), right(NULL) {
	}
};*/
class Solution {
public:
    vector<int> PrintFromTopToBottom(TreeNode* root) {
        vector<int> res;
        if(root==NULL){
            return res;
        }
        queue<TreeNode*> q;
        q.push(root);
        while(!q.empty()){
            TreeNode* node=q.front();
            q.pop();
            if(node->left){q.push(node->left);}
            if(node->right){q.push(node->right);}
            
            res.push_back(node->val);
        }
        return res;
    }
};
```

如果需要知道当前打印的数据在第几层

```c++
class Solution {
public:
    vector<int> PrintFromTopToBottom(TreeNode* root) {
        vector<int> res;
      	int layer=0;
        if(root==NULL){
            return res;
        }
        queue<TreeNode*> q;
        q.push(root);
        while(!q.empty()){
          int size=q.size();
          while(size--){
            TreeNode* node=q.front();
            q.pop();
            if(node->left){q.push(node->left);}
            if(node->right){q.push(node->right);}
            cout<<"第"<<layer<<"层，数为"<<node->val<<endl;
            res.push_back(node->val);
          }
          layer++;   
        }
        return res;
    }
};
```

##### No.23 [二叉树搜索树的后序遍历](https://www.nowcoder.com/practice/a861533d45854474ac791d90e447bafd?tpId=13&tags=&title=&difficulty=0&judgeStatus=0&rp=1)

> 输入一个整数数组，判断该数组是不是某二叉搜索树的后序遍历的结果。如果是则返回true,否则返回false。假设输入的数组的任意两个数字都互不相同。（ps：我们约定空树不是二叉搜索树）

<!--二叉搜索树（Binary Search Tree），它或者是一棵空树，或者是具有下列性质的二叉树： 若它的左子树不空，则左子树上所有结点的值均小于它的根结点的值； 若它的右子树不空，则右子树上所有结点的值均大于它的根结点的值； 它的左、右子树也分别为二叉排序树。-->

<!--后序遍历：左节点 -> 右节点 -> 根节点-->

```c++
class Solution {
public:
    bool check(vector<int> s,int first,int last){
        if(first>=last){
            return true;
        }
        int root=s[last];// 根节点
        int i=first;
        for(i=first;i<last;i++){
            if(s[i]>root){
                break;
            }
        }
        for(int j=i;j<last;j++){
            if(s[j]<root){
                return false;
            }
        }
        vector<int> left(s.begin(),s.begin()+i),right(s.begin()+i+1,s.begin()+s.size());
        bool subLeft=VerifySquenceOfBST(left);
        bool subRight=VerifySquenceOfBST(right);
        return check(s,first,i-1)&&check(s,i,last-1);
    }
    bool VerifySquenceOfBST(vector<int> sequence) {
        if(sequence.size()==0){
            return false;
        }
        return check(sequence,0,sequence.size()-1);
    }
};
```

##### No.24 [二叉树中和为某一值的路径](https://www.nowcoder.com/practice/b736e784e3e34731af99065031301bca?tpId=13&tags=&title=&difficulty=0&judgeStatus=0&rp=1)

> 输入一颗二叉树的根节点和一个整数，按字典序打印出二叉树中结点值的和为输入整数的所有路径。路径定义为从树的根结点开始往下一直到叶结点所经过的结点形成一条路径。

<!--递归遍历整棵树，每次遍历的时候把和的剩余值和路径传递下去，递归的终止条件是遍历到叶子节点，如果当前走的这段路径满足和为target那么就把路径记录在全局变量值之中，遍历完整棵树后得到结果。-->

```c++
/*
struct TreeNode {
	int val;
	struct TreeNode *left;
	struct TreeNode *right;
	TreeNode(int x) :
			val(x), left(NULL), right(NULL) {
	}
};*/
class Solution {
public:
    vector<vector<int>> res;
    void dfs(TreeNode* root,int num,vector<int> path){
        path.push_back(root->val);
        if(root->left==NULL&&root->right==NULL){
            // leaf root
            if(num-root->val==0){
                res.push_back(path);
            }
            return;
        }
        if(root->left)dfs(root->left,num-root->val,path);
        if(root->right)dfs(root->right,num-root->val,path);
    }
    vector<vector<int> > FindPath(TreeNode* root,int expectNumber) {
        vector<int> path;
        if(root){
            dfs(root,expectNumber,path);
        }
        return res;
    }
};
```

### 第六天（2021-7-18）

------

##### No.25 [复杂链表的复制](https://www.nowcoder.com/practice/f836b2c43afc4b35ad6adc41ec941dba?tpId=13&tags=&title=&difficulty=0&judgeStatus=0&rp=1)

> 输入一个复杂链表（每个节点中有节点值，以及两个指针，一个指向下一个节点，另一个特殊指针random指向一个随机节点），请对此链表进行深拷贝，并返回拷贝后的头结点。（注意，输出结果中请不要返回参数中的节点引用，否则判题程序会直接返回空）。 下图是一个含有5个结点的复杂链表。图中实线箭头表示next指针，虚线箭头表示random指针。为简单起见，指向null的指针没有画出。

![JZ25](./JZ25.png)

<!--step1：在每个结点的后面插入新结点。该新结点为克隆结点，这么做是为了连接random结点。-->

<!--step2：连接random结点。-->

<!--step3：拆分链表，下边为原链表，上边为clone链表。-->

![img](https://upload-images.jianshu.io/upload_images/15179814-e5a8510f8692f8a4.png)

```c++
/*
struct RandomListNode {
    int label;
    struct RandomListNode *next, *random;
    RandomListNode(int x) :
            label(x), next(NULL), random(NULL) {
    }
};
*/
class Solution {
public:
    RandomListNode* Clone(RandomListNode* pHead) {
        if(pHead==NULL){
            return pHead;
        }
        RandomListNode* head=pHead;
        while(head!=NULL){
            RandomListNode* clone = new RandomListNode(head->label);
            clone->next=head->next;
            head->next=clone;
            head=clone->next;
        }
        head=pHead;
        while(head!=NULL){
            if(head->random!=NULL){
                head->next->random=head->random->next;
            }
            head=head->next->next;
        }
        RandomListNode *newHead=pHead->next;
        head=pHead;
        while(head->next!=NULL){
            RandomListNode* node=head->next;
            head->next=node->next;
            head=node;
        }
        return newHead;
    }
};
```

##### No.26 [二叉搜索树与双向链表](https://www.nowcoder.com/practice/947f6eb80d944a84850b0538bf0ec3a5?tpId=13&tags=&title=&difficulty=0&judgeStatus=0&rp=1)

> 输入一棵二叉搜索树，将该二叉搜索树转换成一个排序的双向链表。
>
> 注意:
>
> 1.要求不能创建任何新的结点，只能调整树中结点指针的指向。当转化完成以后，树中节点的左指针需要指向前驱，树中节点的右指针需要指向后继
> 2.返回链表中的第一个节点的指针
> 3.函数返回的TreeNode，有左右指针，其实可以看成一个双向链表的数据结构
>
> 4.你不用输出或者处理，示例中输出里面的英文，比如"From left to right are:"这样的，程序会根据你的返回值自动打印输出

![JZ26](./JZ26.png)

<!--用递归来解决这个问题，Convert方法返回一个排好序的双向链表的头，即对于示例中根节点10来说，Convert(pRoot->left)会返回4-6-8链表的头4，Convert(pRoot->right)会返回12-14-16链表头12，我们要讲8-10-12按要求连接并返回整个链表的头4，还要考虑左右子树分别为空的场景。-->

```c++
/*
struct TreeNode {
	int val;
	struct TreeNode *left;
	struct TreeNode *right;
	TreeNode(int x) :
			val(x), left(NULL), right(NULL) {
	}
};*/
class Solution {
public:
    TreeNode* Convert(TreeNode* pRootOfTree)
    {
        if(pRootOfTree==NULL||(pRootOfTree->left==NULL&&pRootOfTree->right==NULL)){
            return pRootOfTree;
        }
        TreeNode* head=pRootOfTree;
        if(pRootOfTree->left){
            head=Convert(pRootOfTree->left);
            TreeNode* left=head;
            while(left->right){
                left=left->right;
            }
            left->right=pRootOfTree;
            pRootOfTree->left=left;
        }
        
        if(pRootOfTree->right){
            TreeNode* right=Convert(pRootOfTree->right);
            right->left=pRootOfTree;
            pRootOfTree->right=right;
        }
        return head;
    }
};
```

##### No.27 [字符串的排列](https://www.nowcoder.com/practice/fe6b651b66ae47d7acce78ffdd9a96c7?tpId=13&tags=&title=&difficulty=0&judgeStatus=0&rp=1)

> 输入一个字符串,按字典序打印出该字符串中字符的所有排列。例如输入字符串abc,则按字典序打印出由字符a,b,c所能排列出来的所有字符串abc,acb,bac,bca,cab和cba。

<!--处理思路类似24题，依然是用递归固定每一位然后向下一位传递需要的数据。但需要注意会有重复字符，因此需要用set去重。-->

```c++
class Solution {
public:
    set<string> res;
    void dfs(vector<char> notUsed,string s){
        if(notUsed.size()==1){
            s+=notUsed[0];
            res.insert(s);
            return;
        }
        for(int i=0;i<notUsed.size();i++){
            vector<char> temp(notUsed);
            string loopS=s;
            loopS+=notUsed[i];
            temp.erase(temp.begin()+i);
            dfs(temp,loopS);
        }
    }
    vector<string> Permutation(string str) {
        vector<char> book;
        for(char c:str){
            book.push_back(c);
        }
        string s="";
        dfs(book,s);
        return vector<string>{res.begin(),res.end()};
    }
};
```

![JZ27S](JZ27S.png)

我们先固定A不动，然后交换B与C，从而得到`"ABC" 和 "ACB"`；然后固定B不动，交换AC得到```"BAC"、"BCA"```同理可得```"CAB"、"CBA"```

递归三部曲：

1. 递归函数的功能：`dfs(int pos, string s)`, 表示固定字符串`s`的`pos`下标的字符`s[pos]`
2. 递归终止条件：当`pos+1 == s.length()`的时候，终止，表示对最后一个字符进行固定，也就说明，完成了一次全排列
3. 下一次递归：`dfs(pos+1, s)`, 很显然，下一次递归就是对字符串的下一个下标进行固定

```c++
class Solution {
public:
    void dfs(int p,string s,set<string> &res){
        if(p+1==s.size()){
            res.insert(s);
            return;
        }
        // for循环和swap的含义：对于“ABC”，
        // 第一次'A' 与 'A'交换，字符串为"ABC", pos为0， 相当于固定'A'
        // 第二次'A' 与 'B'交换，字符串为"BAC", pos为0， 相当于固定'B'
        // 第三次'A' 与 'C'交换，字符串为"CBA", pos为0， 相当于固定'C'
        for(int i=p;i<s.size();i++){
            swap(s[p],s[i]);
            dfs(p+1,s,res);
            swap(s[p],s[i]);
            // 回溯的原因：比如第二次交换后是"BAC"，需要回溯到"ABC"
            // 然后进行第三次交换，才能得到"CBA"
        }
    }
    vector<string> Permutation(string str) {
        set<string> res;
        dfs(0,str,res);
        return vector<string> {res.begin(),res.end()};
    }
};
```

##### No.28 [数组中出现超过一半的数字](https://www.nowcoder.com/practice/e8a1b01a2df14cb2b228b30ee6a92163?tpId=13&tags=&title=&difficulty=0&judgeStatus=0&rp=1)

> 数组中有一个数字出现的次数超过数组长度的一半，请找出这个数字。例如输入一个长度为9的数组[1,2,3,2,2,2,5,4,2]。由于数字2在数组中出现了5次，超过数组长度的一半，因此输出2。你可以假设数组是非空的，并且给定的数组总是存在多数元素。1<=数组长度<=50000

```c++
class Solution {
public:
    int MoreThanHalfNum_Solution(vector<int> numbers) {
        unordered_map<int,int> count;
        for(int i=0;i<numbers.size();i++){
            int n=numbers[i];
            count[n]++;
            if(count[n]>numbers.size()/2){
                return n;
            }
        }
        return -1;
    }
};
```

<!--如果两个数不相等，就消去这两个数，最坏情况下，每次消去一个众数和一个非众数，那么如果存在众数，最后留下的数肯定是众数。-->

```c++
class Solution {
public:
    int MoreThanHalfNum_Solution(vector<int> numbers) {
        int cond=-1;
        int count=0;
        for(int i=0;i<numbers.size();i++){
            if(count==0){
                cond=numbers[i];
                count++;
            }else{
                if(numbers[i]==cond){
                    count++;
                }else{
                    count--;
                }
            }
        }
        return cond;
    }
};
```

##### No.29 [最小的k个数](https://www.nowcoder.com/practice/6a296eb82cf844ca8539b57c23e6e9bf?tpId=13&tags=&title=&difficulty=0&judgeStatus=0&rp=1)

> 给定一个数组，找出其中最小的K个数。例如数组元素是4,5,1,6,2,7,3,8这8个数字，则最小的4个数字是1,2,3,4。
>
> - 0 <= k <= input.length <= 10000
> - 0 <= input[i] <= 10000

```c++
class Solution {
public:
    vector<int> GetLeastNumbers_Solution(vector<int> input, int k) {
        sort(input.begin(),input.end());
        return vector<int>{input.begin(),input.begin()+k};
    }
};
```

##### No.30 [连续子数组的最大和](https://www.nowcoder.com/practice/459bd355da1549fa8a49e350bf3df484?tpId=13&tags=&title=&difficulty=0&judgeStatus=0&rp=1)

> 输入一个整型数组，数组里有正数也有负数。数组中的一个或连续多个整数组成一个子数组。求所有子数组的和的最大值。要求时间复杂度为 O(n).

<!--思路：对下标为i的元素array[i]，先试探的加上array[i], 如果和为负数，显然，以i结尾的元素对整个结果不作贡献。-->

具体过程：

1. 初始化：维护一个变量sum = 0
2. 如果sum+array[i] < 0, 说明以i结尾的不作贡献，重新赋值sum = 0，起点为下一个i
3. 否则更新tmp = tmp + array[i]
   最后判断tmp是否等于0， 如果等于0， 说明数组都是负数，选取一个最大值为答案。

```c++
class Solution {
public:
    int FindGreatestSumOfSubArray(vector<int> array) {
        int left,right,sum,max;
        left=sum=0;
        max=array[0];
        for(;left<array.size();left++){
            int start=array[left];
            sum+=start;
            if(sum<0){
                sum=0;
                continue;
            }
            max=max>sum?max:sum;
        }
        if(sum!=0)
            return max;
        return *max_element(array.begin(), array.end());
    }
};
```

<!--动态规划-->

<!--状态定义：dp[i]表示以i结尾的连续子数组的最大和。所以最终要求dp[n-1]-->
<!--状态转移方程：dp[i] = max(array[i], dp[i-1]+array[i])-->
<!--解释：如果当前元素为整数，并且dp[i-1]为负数，那么当然结果就是只选当前元素-->

```c++
class Solution {
public:
    int FindGreatestSumOfSubArray(vector<int> array) {
        int sz = array.size();
        vector<int> dp(sz+1, 1);
        dp[0] = 0; // 表示没有元素
        int ret = array[0];
        for (int i=1; i<=sz; ++i) {
            dp[i] = max(array[i-1], dp[i-1]+array[i-1]);
            ret = max(ret, dp[i]);
        }
        return ret;
    }
};
```

