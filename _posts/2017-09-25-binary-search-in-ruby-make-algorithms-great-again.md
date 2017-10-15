---
layout: post
title: "Binary Search in Ruby - Make Algorithms Great Again"
description: "A simplest implementation of binary search in ruby."
category:
tags: ["Ruby"]
change_frequency: "weekly"
priority: 0.8
date: 2017-09-25 23:00:15
---

### Algorithm

This is the simplest implementation of binary search something that every programmer should be able to write.

```ruby
class BinarySearch

  def initialize(arr)
    @list = arr
  end

  def search(item)
    start, last = [0, @list.length - 1]

    while start <= last do
      mid = (start + last)/2
      if @list[mid] == item
        return mid
      elsif @list[mid] < item
        start = mid + 1
      else
        last = mid - 1
      end
    end

    false
  end

end
```
### How to use

```ruby
arr = [*1..1000]
bs = BinarySearch.new(arr)
item = rand(1..1000)
position = bs.search(item)
puts position.to_s
```

### Rspec

```ruby
describe BinarySearch do

  it "is searching for element in list" do
    arr = [*1..1000]
    bs = BinarySearch.new(arr)
    item = rand(1..1000)
    position = bs.search(item)
    expect(position).to eq (item-1)
  end

end
```



{% include JB/setup %}
