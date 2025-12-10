class Node:

    def __init__(self, value):
        self.value = value
        self.next = None

class LinkedList:

    def __init__(self):
        self.head = None

    def __repr__(self):
        values = []
        current = self.head
        while current is not None:
            values.append(repr(current.value))
            current = current.next
        return f"LinkedList([{', '.join(values)}])"

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
                    if last.next is None:
                        raise ValueError("Index is out of bounds")
                    last = last.next
                node = Node(value)
                node.next = last.next
                last.next = node

    def remove(self, value):
        count = 0
        last = self.head
        while last is not None:
            if last.value == value:
                return self.pop(count)
            count += 1
            last = last.next

    def pop(self, index):
        if self.head is None:
            raise ValueError("Index is out of bounds")
        if index == 0:
            value = self.head.value
            self.head = self.head.next
            return value
        
        node = self.head
        for i in range(index-1):
            if node.next is None:
                raise ValueError("Index is out of bounds")
            node = node.next
        if node.next is None:
            raise ValueError("Index is out of bounds")
        node_to_pop = node.next
        node_to_link_to = node_to_pop.next
        node.next = node_to_link_to
        return node_to_pop.value

    def get(self, index):
        last = self.head
        if last is None:
            raise ValueError("Index is out of bounds")
        for i in range(index):
            if last.next is None:
                raise ValueError("Index is out of bounds")
            last = last.next
        return last.value

    def print(self):
        last = self.head
        result = ''
        while last is not None:
            result += str(last.value) + ' '
            last = last.next
        return result.strip()


linked_list = LinkedList()
linked_list.append('1')
linked_list.append('3')
linked_list.insert(1, '2')
linked_list.append('4')
linked_list.insert(4, '5')
print(linked_list.__repr__())
print(linked_list.remove('2'))
print(linked_list.__repr__())
