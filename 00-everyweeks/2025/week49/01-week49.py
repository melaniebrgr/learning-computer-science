# Day 1: Secret Entrance
from pathlib import Path

file_path = Path(__file__).parent / 'input.txt'
with open(file_path, 'r') as file:
    lines = file.read().splitlines()

class DoublyLinkedNode:
    # Define a doubly linked node list class
    def __init__(self, value):
        self.value = value
        self.next = None
        self.previous = None

# Create a doubly linked list ring example
def create_node_ring(size: int, initial_position: int) -> DoublyLinkedNode:
    # Given a size
    # Create a doubly linked node ring list of given size
    # the "first" node should point to the "last" node and vice versa
    # the node at the initial position should be returned
    pass

def instruction_splitter(instruction_raw: str) -> tuple[str, int]:
    # Split direction and distance
    # E.g. "L68" -> ("left", 68)
    # E.g. "R48" -> ("right", 48)
    direction = "left" if instruction_raw[0] == "L" else "right"
    distance = int(instruction_raw[1:])
    return direction, distance

def instruction_dialer(instruction_split: tuple[str, int], node: DoublyLinkedNode) -> None:
    # Execute the instruction
    # E.g. ("left", 68) -> rotate left 68 clicks
    # E.g. ("right", 48) -> rotate right 48 clicks
    match instruction_split:
        case ("left", distance):
            for _ in range(distance):
                node = node.previous
        case ("right", distance):
            for _ in range(distance):
                node = node.next
    return node

def instructions_executor(instructions: [str], node: DoublyLinkedNode) -> int:
    # given a list of strings
    # iterate through the list
    # for each item call the instruction splitter then the instruction dialer
    # if the dial value is 0, increment the count
    # return the count
    count = 0
    next_node = node
    for instruction_raw in instructions:
        instruction_split = instruction_splitter(instruction_raw)
        next_node = instruction_dialer(instruction_split, next_node)
        if next_node.value == 0:
            count += 1
    return count

print(instructions_executor(['R1', 'L1', 'R2', 'R3'], node_1)) # 2