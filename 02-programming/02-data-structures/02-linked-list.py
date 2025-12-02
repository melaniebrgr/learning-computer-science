class Node:

    def __init__(self, value):
        self.value = value
        self.next = None

class LinkedList:

    def __init__(self):
        self.head = None

    def __repr__(self):
        pass

    # O(n) - linear time (best is constant, worst is linear, and average is n/2)
    def __contains__(self, value):
        last = self.head
        while last is not None:
            if last.value == value:
                return True
            last = last.next
        return False

    # O(n) - linear time (best, worst and average)
    # The runtime complexity could be reduced by tracking a size
    def __len__(self):
        counter = 0
        last = self.head
        while last is not None:
            counter += 1
            last = last.next
        return counter

    # O(n) - linear time (best, worst and average)
    def append(self, value):
        if self.head is None:
            self.head = Node(value)
        else:
            last = self.head
            while last.next:
                last = last.next
            last.next = Node(value)

    # O(1) - constant time (best, worst and average)
    def prepend(self, value):
        node = Node(value)
        node.next = self.head
        self.head = node

    # O(n) - linear time (best is constant, worst is linear, average is n/2)
    def insert(self, index, value):
        if index == 0:
            self.prepend(value)
        else:
            if self.head is None:
                raise ValueError("Index is out of bounds")
            else:
                last = self.head
                for i in range(index-1):
                    if last.next == None:
                        raise ValueError("Index is out of bounds")
                    last = last.next
                node = Node(value)
                node.next = last.next
                last.next = node

    def remove(self, value):
        pass

    def pop(self, index):
        pass

    def get(self, index):
        pass

    def print(self):
        pass


linked_list = LinkedList()
linked_list.append('1')
linked_list.append('2')
linked_list.append('3')
print(linked_list.__len__())