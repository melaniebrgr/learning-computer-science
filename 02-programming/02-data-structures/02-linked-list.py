class Node:

    def __init__(self, value):
        self.value = value
        self.next = None

class LinkedList:

    def __init__(self):
        self.head = None

    def __repr__(self):
        pass

    def __contains__(self):
        pass

    def __len__(self):
        pass

    def append(self, value):
        if self.head is None:
            self.head = Node(value)
        else:
            last = self.head
            while last.next:
                last = last.next
            last.next = Node(value)

    def prepend(self, value):
        pass

    def insert(self, index, value):
        pass

    def remove(self, value):
        pass

    def pop(self, index):
        pass


linked_list = LinkedList()
linked_list.append('1')